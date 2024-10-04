/**
 * Clears the value of all cookies that are not `HttpOnly`.
 */
export function deleteAllCookies() {
  document.cookie.split(';').forEach((cookie) => {
    const equalsIndex = cookie.indexOf('=');
    const name = equalsIndex > -1 ? cookie.substring(0, equalsIndex) : cookie;
    // eslint-disable-next-line functional/immutable-data
    document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT';
  });
}
