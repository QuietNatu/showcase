import { ClientRequest } from 'node:http';

import { http, HttpResponse } from 'msw';
import { beforeEach, describe, expect, test, vi } from 'vitest';

import { mockServer } from '../../mocks/api/server';
import { AppRequestHeader } from '../config/headers';
import { Either } from '../lib/fp';
import type { ApiClientOptions } from './api-client.server';
import { apiClient } from './api-client.server';
import { runWithApiTestContext } from './api-test-context.server';

describe.each([
  {
    method: 'apiClient.get',
    doRequest: (options?: ApiClientOptions) => apiClient.get('/example', options),
  },
  {
    method: 'apiClient.post',
    doRequest: (options?: ApiClientOptions) => apiClient.post('/example', {}, options),
  },
  {
    method: 'apiClient.put',
    doRequest: (options?: ApiClientOptions) => apiClient.put('/example', {}, options),
  },
  {
    method: 'apiClient.patch',
    doRequest: (options?: ApiClientOptions) => apiClient.patch('/example', {}, options),
  },
  {
    method: 'apiClient.delete',
    doRequest: (options?: ApiClientOptions) => apiClient.delete('/example', options),
  },
  {
    method: 'apiClient.method',
    doRequest: (options?: ApiClientOptions) => apiClient.method({ ...options, url: '/example' }),
  },
])('$method', ({ doRequest }) => {
  describe('test headers', () => {
    beforeEach(() => {
      vi.stubEnv('API_BASE_URL', 'https://api.com');
      vi.stubEnv('TEST_API_BASE_URL', 'https://test.com');
      mockServer.use(http.all('*/example', () => HttpResponse.json({ name: 'John' })));
    });

    describe('when test data is available', () => {
      const testScenariosHeader = ['example-id-1', 'example-id-2'].join(',');

      test('adds test header to request', async () => {
        const result = await runWithApiTestContext({ testScenariosHeader }, () =>
          doRequest({ headers: { 'Custom-Header': 'value' } }),
        );

        expect.assert(Either.isRight(result));
        expect(result.right.request?.getHeader('Custom-Header')).toBe('value');
        expect(result.right.request?.getHeader(AppRequestHeader.TestScenarios)).toBe(
          testScenariosHeader,
        );
      });

      test('modifies request base url', async () => {
        const [result1, result2] = await runWithApiTestContext({ testScenariosHeader }, () =>
          Promise.all([doRequest(), doRequest({ baseURL: 'https://api.com' })]),
        );

        expect.assert(Either.isRight(result1));
        expect.assert(Either.isRight(result2));
        expect(result1.right.request?.host).toBe('test.com');
        expect(result2.right.request?.host).toBe('test.com');
      });
    });

    describe('when test data is NOT available', () => {
      test('does NOT add test header to request', async () => {
        const result = await doRequest({ headers: { 'Custom-Header': 'value' } });

        expect.assert(Either.isRight(result));
        expect.assert(result.right.request !== undefined);
        expect(result.right.request.getHeader('Custom-Header')).toBe('value');
        expect(result.right.request.getHeader(AppRequestHeader.TestScenarios)).toBeUndefined();
      });

      test('does NOT modify request base url', async () => {
        const result = await doRequest({ baseURL: 'https://api.com' });

        expect.assert(Either.isRight(result));
        expect(result.right.request?.host).toBe('api.com');
      });
    });
  });

  describe('response handling', () => {
    describe('when request succeeds', () => {
      test('returns success result', async () => {
        mockServer.use(http.all('*/example', () => HttpResponse.json({ name: 'John' })));

        const result = await doRequest();

        expect.assert(Either.isRight(result));
        expect(result.right.data).toStrictEqual({ name: 'John' });
        expect(result.right.status).toBe(200);
        expect(result.right.statusText).toBe('OK');
        expect(result.right.request).toBeInstanceOf(ClientRequest);
      });
    });

    describe('when request fails', () => {
      describe('when server responds', () => {
        test('returns error result', async () => {
          mockServer.use(
            http.all('*/example', () => {
              throw HttpResponse.json({ error: 'Unknown Error' }, { status: 500 });
            }),
          );

          const result = await doRequest();

          expect.assert(Either.isLeft(result));
          expect(result.left.response?.data).toStrictEqual({ error: 'Unknown Error' });
          expect(result.left.response?.status).toBe(500);
          expect(result.left.response?.statusText).toBe('Internal Server Error');
          expect(result.left.request).toBeInstanceOf(ClientRequest);
          expect(result.left.message).toBeDefined();
          expect(result.left.error).toBeDefined();
        });
      });

      describe('when there is a network error', () => {
        test('returns error result without response', async () => {
          mockServer.use(
            http.all('*/example', () => {
              throw HttpResponse.error();
            }),
          );

          const result = await doRequest();

          expect.assert(Either.isLeft(result));
          expect(result.left.response).toBeUndefined();
          expect(result.left.request).toBeDefined();
          expect(result.left.message).toBeDefined();
          expect(result.left.error).toBeDefined();
        });
      });
    });
  });
});

// Additional tests for specific method functionality
describe('apiClient.method', () => {
  test('uses specified method', async () => {
    mockServer.use(
      http.get('*/example', () => HttpResponse.json({ method: 'GET' })),
      http.post('*/example', () => HttpResponse.json({ method: 'POST' })),
    );

    const [getResult, postResult] = await Promise.all([
      apiClient.method({ url: '/example', method: 'GET' }),
      apiClient.method({ url: '/example', method: 'POST', data: {} }),
    ]);

    expect.assert(Either.isRight(getResult));
    expect.assert(Either.isRight(postResult));
    expect(getResult.right.data).toStrictEqual({ method: 'GET' });
    expect(postResult.right.data).toStrictEqual({ method: 'POST' });
  });
});
