import express from 'express';
import helmet from 'helmet';
import { toNodeHandler } from 'srvx/node';

const port = Number.parseInt(process.env.PORT ?? '3000');

const app = express();

// @ts-expect-error -- server import has no types
const { default: handler } = (await import('./dist/server/server.js')) as {
  default: { fetch: typeof fetch };
};
const nodeHandler = toNodeHandler(handler.fetch);

app.use(helmet()); // TODO:
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
