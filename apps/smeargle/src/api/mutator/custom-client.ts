import { AxiosRequestConfig, AxiosResponse } from 'axios';
import { apiClient } from '../client';

/**
 * TODO:
 */
export const customClient = <T>(config: AxiosRequestConfig): Promise<AxiosResponse<T>> => {
  return apiClient(config);
};
