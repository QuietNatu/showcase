import { createServerApp } from './create-app.ts';

const port = Number.parseInt(process.env.PORT ?? '6010');

await createServerApp({ port });
