import '../lib/test/extend-expect';

import { deleteAllCookies } from '@natu/utils';

afterEach(() => {
  vi.clearAllMocks();

  localStorage.clear();
  sessionStorage.clear();

  deleteAllCookies();
});
