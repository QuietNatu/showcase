import '../lib/test/extend-expect';

import { deleteAllCookies } from '@natu/utils';

afterEach(() => {
  localStorage.clear();
  sessionStorage.clear();

  deleteAllCookies();
});
