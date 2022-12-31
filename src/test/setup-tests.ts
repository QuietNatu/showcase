import './extend-matchers';

import { deleteAllCookies } from './utils/cookie';

afterEach(() => {
  vi.clearAllMocks();

  localStorage.clear();
  sessionStorage.clear();

  deleteAllCookies();
});
