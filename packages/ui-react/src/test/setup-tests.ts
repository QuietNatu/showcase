import '../lib/test/extend-expect';

import { deleteAllCookies } from '@natu/utils';
import { mockI18n } from '../mocks/i18n';

// eslint-disable-next-line vitest/no-hooks
beforeAll(async () => {
  await mockI18n();
});

afterEach(() => {
  localStorage.clear();
  sessionStorage.clear();

  deleteAllCookies();
});
