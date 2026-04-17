import axios, { AxiosRequestConfig } from 'axios';
import { getTestData } from '../test-context';

// TODO: logging

export type ApiClientOptions = {
  baseURL?: AxiosRequestConfig['baseURL'];
  headers?: AxiosRequestConfig['headers'];
};

/** Options that can be used with dynamic method */
export type ApiClientMethodOptions = ApiClientOptions & {
  url?: AxiosRequestConfig['url'];
  method?: AxiosRequestConfig['method'];
};

const client = axios.create({ baseURL: process.env.API_BASE_URL });

/** Preconfigured api client. Should only be used server-side as to not leak secrets. */
export const apiClient = {
  method: <T>(config: ApiClientMethodOptions) => client<T>(withTestHeaders(config)),
  get: (url: string, options: ApiClientOptions) => client.get(url, withTestHeaders(options)),
  post: <T>(url: string, data: T, options: ApiClientOptions) =>
    client.post<T>(url, data, withTestHeaders(options)),
  put: <T>(url: string, data: T, options: ApiClientOptions) =>
    client.put<T>(url, data, withTestHeaders(options)),
  patch: <T>(url: string, data: T, options: ApiClientOptions) =>
    client.patch<T>(url, data, withTestHeaders(options)),
};

// TODO:
function withTestHeaders(config: AxiosRequestConfig) {
  const testId = getTestData()?.testId;
  return axios.mergeConfig(config, { headers: { 'test-id': testId } });
}
