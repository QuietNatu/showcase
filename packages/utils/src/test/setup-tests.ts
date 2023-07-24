import { deleteAllCookies } from '../cookie';

afterEach(() => {
  vi.clearAllMocks();

  localStorage.clear();
  sessionStorage.clear();

  deleteAllCookies();
});
