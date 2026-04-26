import './setup-faker'; // Must be imported first to setup faker before being used

import express, { RequestHandler } from 'express';
import { createMiddleware } from '@mswjs/http-middleware';
import { logResquests, logUnhandledRequests } from './middleware';
import { handlers } from './handlers/handlers';

const port = process.env.PORT ?? 6006;

const middleware = createMiddleware(...handlers) as unknown as RequestHandler;

express()
  .use(logResquests)
  .use(middleware)
  .use(logUnhandledRequests)
  .listen(port, () => {
    // eslint-disable-next-line no-console -- server log
    console.log(`Mock server is running on http://localhost:${port}`);
  });
