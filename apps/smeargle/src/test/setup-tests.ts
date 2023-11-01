import '@natu/ui-react/test/extend-expect';

import { mockDatabase } from '@/mocks/server/database/database';
import { mockServer } from '@/mocks/server/server';
import { drop } from '@mswjs/data';
import { deleteAllCookies } from '@natu/utils';

beforeAll(() => {
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
