import './extend-expect';

import { deleteAllCookies } from './utils/cookie';

afterEach(() => {
  vi.clearAllMocks();

  localStorage.clear();
  sessionStorage.clear();

  deleteAllCookies();
});
