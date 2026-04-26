import { beforeEach, describe, expect, test } from 'vitest';
import { apiClient } from './api-client.server';
import { Either } from '../lib/fp';
import { runWithApiTestContext } from './api-test-context.server';
import { mockServer } from '../../mocks/api/server';
import { http, HttpResponse } from 'msw';
import { ClientRequest } from 'node:http';
import { AppRequestHeader } from '../config/headers';

// TODO: remaining handlers

describe('test headers', () => {
  beforeEach(() => {
    mockServer.use(http.get('*/example', () => HttpResponse.json({ name: 'John' })));
  });

  describe('when test data is available', () => {
    test('adds test headers to request', async () => {
      const scenarioId = 'example-id';

      const result = await runWithApiTestContext({ scenarioId }, () => apiClient.get('/example'));

      expect.assert(Either.isRight(result));
      expect(result.right.request?.getHeader(AppRequestHeader.TestScenarioId)).toBe(scenarioId);
      // TODO: base url
    });
  });

  describe('when test data is NOT available', () => {
    test('does NOT add test headers to request', async () => {
      const result = await apiClient.get('/example');

      expect.assert(Either.isRight(result));
      expect.assert(result.right.request !== undefined);
      expect(result.right.request.getHeader(AppRequestHeader.TestScenarioId)).toBeUndefined();
      // TODO: base url
    });
  });
});

describe('response handling', () => {
  describe('when request succeeds', () => {
    // TODO: more test scenarios? when response is not made, when request is not made
    test('returns response data', async () => {
      mockServer.use(http.get('*/example', () => HttpResponse.json({ name: 'John' })));

      const result = await apiClient.get('/example');

      expect.assert(Either.isRight(result));
      expect(result.right.data).toStrictEqual({ name: 'John' });
      expect(result.right.status).toBe(200);
      expect(result.right.statusText).toBe('OK');
      expect(result.right.request).toBeInstanceOf(ClientRequest);
    });
  });

  describe('when request fails', () => {
    test('returns error data', async () => {
      mockServer.use(
        http.get('*/example', () => {
          throw HttpResponse.json({ error: 'Unknown Error' }, { status: 500 });
        }),
      );

      const result = await apiClient.get('/example');

      expect.assert(Either.isLeft(result));
      expect(result.left.response?.data).toStrictEqual({ error: 'Unknown Error' });
      expect(result.left.response?.status).toBe(500);
      expect(result.left.response?.statusText).toBe('Internal Server Error');
      expect(result.left.request).toBeInstanceOf(ClientRequest);
      expect(result.left.message).toBe('Request failed with status code 500');
    });
  });
});
