import { AxiosResponse } from 'axios';
import { apiClient, ApiClientGeneratorOptions, ApiClientOptions } from '../client';

/**
 * TODO:
 */
export const customClient = <T>(
  config: ApiClientGeneratorOptions,
  options?: ApiClientOptions,
): Promise<AxiosResponse<T>> => {
  return apiClient({ ...config, ...options });
};
