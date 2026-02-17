import '@natu/axe/vitest/extend-expect';

import { afterAll, afterEach, beforeAll } from 'vitest';
import { mockServer } from '../mocks/api/server';

// TODO: seed faker

beforeAll(() => {
  mockServer.listen({ onUnhandledRequest: 'warn' });
});

afterEach(() => {
  mockServer.resetHandlers();
});

afterAll(() => {
  mockServer.close();
});
