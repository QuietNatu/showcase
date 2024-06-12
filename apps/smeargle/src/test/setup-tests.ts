/* eslint-disable vitest/no-hooks */
import '@natu/ui-react/test/extend-expect';

import { mockDatabase } from '@/mocks/server/database/database';
import { mockServer } from '@/mocks/server/server';
import { drop } from '@mswjs/data';
import { deleteAllCookies } from '@natu/utils';
import { setupTestI18n } from '@/mocks/i18n';

beforeAll(() => {
  setupTestI18n();
  mockServer.listen();
});

afterEach(() => {
  localStorage.clear();
  sessionStorage.clear();

  deleteAllCookies();

  mockServer.resetHandlers();
  drop(mockDatabase);
});

afterAll(() => {
  mockServer.close();
});
