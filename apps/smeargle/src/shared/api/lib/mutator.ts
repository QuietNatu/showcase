import { AxiosResponse } from 'axios';
import { apiClient, ApiClientMethodOptions, ApiClientOptions } from '../api-client.server';

/** Api client to be used by code generation tools */
export const apiClientMutator = <T>(
  config: ApiClientMethodOptions,
  options?: ApiClientOptions,
): Promise<AxiosResponse<T>> => {
  return apiClient.method({ ...config, ...options });
};
