import { styleText } from 'node:util';

import type { RequestHandler } from 'express';

/** Logs all requests made to the server. */
export const logResquests: RequestHandler = (request, response, next) => {
  response.on('finish', () => {
    // eslint-disable-next-line no-console -- server log
    console.log(
      styleText('green', `${request.method} ${request.originalUrl} ${response.statusCode}`),
    );
  });

  next();
};

/** Logs all requests that were not handled by the server. */
export const logUnhandledRequests: RequestHandler = (request, response) => {
  // eslint-disable-next-line no-console -- server log
  console.warn(styleText('red', `Unhandled Request: ${request.method} ${request.originalUrl}`));
  response.status(404).json({ error: 'Not Found' });
};
