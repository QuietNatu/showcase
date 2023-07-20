import 'vitest-dom/extend-expect';
import 'vitest-axe/extend-expect';

import { deleteAllCookies } from './utils/cookie';

afterEach(() => {
  vi.clearAllMocks();

  localStorage.clear();
  sessionStorage.clear();

  deleteAllCookies();
});
