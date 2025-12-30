import axios, { AxiosRequestConfig } from 'axios';

// TODO: avoid using axios types directly?
// TODO: logging

export type ApiClientOptions = {
  headers?: AxiosRequestConfig['headers'];
};

/** Options that can be used by generators */
export type ApiClientGeneratorOptions = ApiClientOptions & {
  url?: AxiosRequestConfig['url'];
  method?: AxiosRequestConfig['method'];
  baseURL?: AxiosRequestConfig['baseURL'];
};

// TODO: move gen code inside api? https://feature-sliced.design/docs/guides/examples/api-requests

// TODO:
export const apiClient = axios.create({ baseURL: process.env.API_BASE_URL });
