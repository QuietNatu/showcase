import { getAppPort } from './src/utils/config';
import { mockServer } from '../../src/mocks/api/server';
import { startServer } from '../../src/server/start-server';

/** Sets up server side mocking and starts the application */
async function globalSetup() {
  mockServer.listen({ onUnhandledRequest: 'warn' });

  // This is a badly done workaround.
  // I did not find another way to mock server-side requests with dynamic data.
  // The alternative would be to create a mock api server and redirect requests there,
  // but that has the downside of being harder to change data on a per test basis.
  // This should be re-addressed once MSW supports cross-process interception https://github.com/mswjs/msw/pull/1617
  // Or when Tanstack Start improves testing tools...
  await startServer({ port: getAppPort() });
}

export default globalSetup;
