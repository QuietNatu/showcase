import { deleteAllCookies } from '../cookie';

afterEach(() => {
  localStorage.clear();
  sessionStorage.clear();

  deleteAllCookies();
});
