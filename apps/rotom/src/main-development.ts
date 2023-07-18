import { bootstrapApp } from './bootstrap-app';

void import('./mocks/server/browser-development')
  .then(({ startWorker }) => startWorker())
  .then(bootstrapApp);
