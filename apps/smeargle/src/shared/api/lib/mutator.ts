import { AxiosResponse } from 'axios';
import { apiClient, ApiClientGeneratorOptions, ApiClientOptions } from '../api-client.server';

/** Api client to be used by code generation tools */
export const apiClientMutator = <T>(
  config: ApiClientGeneratorOptions,
  options?: ApiClientOptions,
): Promise<AxiosResponse<T>> => {
  return apiClient({ ...config, ...options });
};
