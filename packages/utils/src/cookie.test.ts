import { deleteAllCookies } from '.';

test('deletes all cookies', () => {
  // eslint-disable-next-line functional/immutable-data
  document.cookie = 'username=John Doe';

  expect(document.cookie).toBe('username=John Doe');

  deleteAllCookies();

  expect(document.cookie).toBe('');
});
