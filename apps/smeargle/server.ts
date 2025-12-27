import { startServer } from './src/server/start-server.ts';

const port = Number.parseInt(process.env.PORT ?? '6010');

await startServer({ port });
