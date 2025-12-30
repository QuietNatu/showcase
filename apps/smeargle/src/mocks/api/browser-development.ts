import { seedMockDatabase } from './seeds/seeds';
import { developmentHandlers } from './handlers/handlers';
import { setupWorker } from 'msw/browser';

/** Starts the mock service worker with pre-seeded mock data. */
export async function startMockWorker() {
  await seedMockDatabase();
  return setupWorker(...developmentHandlers).start({ onUnhandledRequest: 'error' });
}
