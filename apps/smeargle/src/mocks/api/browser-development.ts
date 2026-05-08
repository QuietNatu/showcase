import { setupWorker } from 'msw/browser';

import { developmentHandlers } from './handlers/handlers';
import { seedMockDatabase } from './seeds/seeds';

/** Starts the mock service worker with pre-seeded mock data. */
export async function startMockWorker() {
  await seedMockDatabase();
  return setupWorker(...developmentHandlers).start({ onUnhandledRequest: 'error' });
}
