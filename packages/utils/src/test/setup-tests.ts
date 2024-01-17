/* eslint-disable vitest/no-hooks */
import { deleteAllCookies } from '../cookie';

afterEach(() => {
  localStorage.clear();
  sessionStorage.clear();

  deleteAllCookies();
});
