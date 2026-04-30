import axios, { AxiosError, AxiosRequestConfig, AxiosResponse, isAxiosError } from 'axios';
import { getApiTestData } from './api-test-context.server';
import { Either, pipe } from '../lib/fp';
import { ClientRequest } from 'node:http';
import { AppRequestHeader } from '../config/headers';

// TODO: logging

export type ApiClientOptions = {
  baseURL?: string;
  headers?: Record<string, string | string[] | number | boolean | null | undefined>;
};

/** Options that can be used with dynamic method */
export type ApiClientMethodOptions = ApiClientOptions & {
  url: string;
  data?: AxiosRequestConfig['data'];
  method?: AxiosRequestConfig['method'];
};

export type ApiClientResponse<T> = {
  data: T;
  status: number;
  statusText: string;
  request?: ClientRequest;
};

export type ApiClientError = {
  response?: { data: unknown; status: number; statusText: string };
  request?: ClientRequest;
  message?: string;
  error: unknown;
};

export type ApiClientResult<T> = Either<ApiClientResponse<T>, ApiClientError>;

const client = axios.create({ baseURL: process.env.API_BASE_URL });

/** Preconfigured api client. Should only be used server-side as to not leak secrets. */
export const apiClient = {
  method: <T>(options: ApiClientMethodOptions) =>
    withMiddleware<T>(options, (config) => client(config)),

  get: <T>(url: string, options?: ApiClientOptions) =>
    withMiddleware<T>(options, (config) => client.get(url, config)),

  delete: (url: string, options?: ApiClientOptions) =>
    withMiddleware(options, (config) => client.delete(url, config)),

  post: <T>(url: string, data: unknown, options?: ApiClientOptions) =>
    withMiddleware<T>(options, (config) => client.post(url, data, config)),

  put: <T>(url: string, data: unknown, options?: ApiClientOptions) =>
    withMiddleware<T>(options, (config) => client.put(url, data, config)),

  patch: <T>(url: string, data: unknown, options?: ApiClientOptions) =>
    withMiddleware<T>(options, (config) => client.patch(url, data, config)),
};

async function withMiddleware<T>(
  config: ApiClientOptions | undefined,
  createRequest: (config: ApiClientOptions) => Promise<AxiosResponse<T>>,
) {
  return withResponseHandling(() => pipe(config ?? {}, withTestConfig, createRequest));
}

/** Adds test config to requests */
function withTestConfig(config: ApiClientOptions): ApiClientOptions {
  const scenarioId = getApiTestData()?.scenarioId;
  return scenarioId
    ? {
        ...config,
        baseURL: process.env.TEST_API_BASE_URL,
        headers: { ...config.headers, [AppRequestHeader.TestScenarioId]: scenarioId },
      }
    : config;
}

/**
 * Transforms result of request as to not expose implementation details
 * and also prevents errors from throwing, forcing them to be handled.
 */
async function withResponseHandling<T>(
  performRequest: () => Promise<AxiosResponse<T>>,
): Promise<ApiClientResult<T>> {
  try {
    const response = await performRequest();
    return Either.right(transformAxiosResponse(response));
  } catch (error) {
    return isAxiosError(error) ? Either.left(transformAxiosError(error)) : Either.left({ error });
  }
}

function transformAxiosResponse<T>(response: AxiosResponse<T>): ApiClientResponse<T> {
  return {
    data: response.data,
    status: response.status,
    statusText: response.statusText,
    request: response.request as ClientRequest, // In Node, Axios uses ClientRequest
  };
}

function transformAxiosError(error: AxiosError): ApiClientError {
  return {
    response: error.response
      ? {
          data: error.response.data,
          status: error.response.status,
          statusText: error.response.statusText,
        }
      : undefined,
    request: error.request as ClientRequest, // In Node, Axios uses ClientRequest
    message: error.message,
    error,
  };
}
