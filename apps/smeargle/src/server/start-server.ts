import express from 'express';
import { toNodeHandler } from 'srvx/node';

type Options = {
  port?: number;
};

/**
 *
 */
export async function startServer(options: Options) {
  // eslint-disable-next-line sonarjs/x-powered-by -- TODO: use 'helmet' to address security issues when dealing with hosting (import helmet from 'helmet';)
  const app = express();

  const nodeHandler = toNodeHandler(await getFetchHandler());

  app.use(express.static('dist/client'));
  app.use(async (req, res, next) => {
    try {
      await nodeHandler(req, res);
    } catch (error) {
      next(error);
    }
  });

  /* eslint-disable no-console -- server logs */
  const server = app.listen(options.port, () => {
    console.log(`Server is running on http://localhost:${options.port}`);
  });

  /* eslint-disable unicorn/no-process-exit -- only called in process.on event handlers */
  const handleClose = () => {
    console.log('Closing server...');

    server.close(() => {
      console.log('Server closed');

      process.exit(0);
    });

    setTimeout(() => {
      console.error('Could not close connections in time, forcefully closing server');
      process.exit(1);
    }, 5000);
  };
  /* eslint-enable unicorn/no-process-exit */
  /* eslint-enable no-console */

  process.on('SIGTERM', handleClose);
  process.on('SIGINT', handleClose);
}

async function getFetchHandler() {
  // @ts-expect-error -- js import has no types
  const { default: handler } = (await import('../../dist/server/server.js')) as {
    default: { fetch: typeof fetch };
  };

  return handler.fetch;
}
