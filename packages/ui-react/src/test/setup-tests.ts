import '../lib/test/extend-expect';

import { deleteAllCookies } from '@natu/utils';
import { mockI18n } from '../mocks/i18n';
import { configure } from '@testing-library/react';

// eslint-disable-next-line vitest/no-hooks
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

  await mockI18n();
});

afterEach(() => {
  localStorage.clear();
  sessionStorage.clear();

  deleteAllCookies();
});
