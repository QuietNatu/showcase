import 'vitest-dom/extend-expect';
import 'vitest-axe/extend-expect'; // TODO: typings not working

import { mockDatabase } from '@/mocks/server/database/database';
import { mockServer } from '@/mocks/server/server';
import { deleteAllCookies } from './utils/cookie';
import { drop } from '@mswjs/data';

beforeAll(() => {
  mockServer.listen();
});

afterEach(() => {
  vi.clearAllMocks();

  localStorage.clear();
  sessionStorage.clear();

  deleteAllCookies();

  mockServer.resetHandlers();
  drop(mockDatabase);
});

afterAll(() => {
  mockServer.close();
});
