import axios, { AxiosRequestConfig } from 'axios';

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

/** Preconfigured api client. Should only be used server-side as to not leak secrets. */
export const apiClient = axios.create({ baseURL: process.env.API_BASE_URL });
