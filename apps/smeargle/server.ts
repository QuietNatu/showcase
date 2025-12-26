import express from 'express';

import { toNodeHandler } from 'srvx/node';

const port = Number.parseInt(process.env.PORT ?? '6010');

// eslint-disable-next-line sonarjs/x-powered-by -- TODO: use 'helmet' to address security issues when dealing with hosting (import helmet from 'helmet';)
const app = express();

// @ts-expect-error -- js import has no types
const { default: handler } = (await import('./dist/server/server.js')) as {
  default: { fetch: typeof fetch };
};
const nodeHandler = toNodeHandler(handler.fetch);

app.use(express.static('dist/client'));
app.use(async (req, res, next) => {
  try {
    await nodeHandler(req, res);
  } catch (error) {
    next(error);
  }
});

app.listen(port, () => {
  // eslint-disable-next-line no-console -- server start log
  console.log(`Server is running on http://localhost:${port}`);
});
