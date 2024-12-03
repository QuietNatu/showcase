/* eslint-disable vitest/no-hooks */
import '@natu/ui-react/test/extend-expect';

import { mockDatabase } from '@/mocks/server/database/database';
import { mockServer } from '@/mocks/server/server';
import { drop } from '@mswjs/data';
import { deleteAllCookies } from '@natu/utils';
import { mockI18n } from '@/mocks/i18n';
import { configure } from '@testing-library/react';

beforeAll(async () => {
  configure({
    // prevents large unhelpful HTML DOM outputs on failed tests
    getElementError: (message) => {
      const error = new Error(message ?? undefined);
      // eslint-disable-next-line functional/immutable-data
      error.name = 'TestingLibraryElementError';
      // eslint-disable-next-line functional/immutable-data
      error.stack = undefined;
      return error;
    },
  });

  mockServer.listen();

  await mockI18n();
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
