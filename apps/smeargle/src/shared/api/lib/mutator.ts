import {
  apiClient,
  ApiClientMethodOptions,
  ApiClientOptions,
  ApiClientResult,
} from '../api-client.server';

/** Api client to be used by code generation tools */
export const apiClientMutator = <T>(
  config: ApiClientMethodOptions,
  options?: ApiClientOptions,
): Promise<ApiClientResult<T>> => {
  return apiClient.method({ ...config, ...options });
};
