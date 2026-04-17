/** Returns the port number to be used by the app. */
export function getAppPort() {
  // TODO:
  return Number.parseInt(process.env.PORT ?? '6001');
}
