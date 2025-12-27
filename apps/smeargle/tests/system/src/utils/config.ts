/** Returns the port number to be used by the app. */
export function getAppPort() {
  return Number.parseInt(process.env.PORT ?? '6004');
}
