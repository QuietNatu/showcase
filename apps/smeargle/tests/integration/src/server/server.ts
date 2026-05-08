import './setup-faker'; // Must be imported first to setup faker before being used

import { createMiddleware } from '@mswjs/http-middleware';
import express from 'express';

import { handlers } from './handlers';
import { logResquests, logUnhandledRequests } from './middleware';

const port = process.env.PORT ?? 6006;

const middleware = createMiddleware(...handlers);

express()
  .use(logResquests)
  .use(middleware)
  .use(logUnhandledRequests)
  .listen(port, () => {
    // eslint-disable-next-line no-console -- server log
    console.log(`Mock server is running on http://localhost:${port}`);
  });
