import '@natu/axe/vitest/extend-expect';

import { faker } from '@faker-js/faker';
import { afterAll, afterEach, beforeAll } from 'vitest';

import { mockServer } from '../mocks/api/server';

beforeAll(() => {
  faker.seed(21);
  mockServer.listen({ onUnhandledRequest: 'warn' });
});

afterEach(() => {
  faker.seed(21);
  mockServer.resetHandlers();
});

afterAll(() => {
  mockServer.close();
});
