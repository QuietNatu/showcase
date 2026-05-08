import { mockWorker } from './browser';
import { seedMockDatabase } from './seeds/seeds';

/** Starts the mock service worker with pre-seeded mock data. */
export async function startWorker() {
  await seedMockDatabase();
  return mockWorker.start({ onUnhandledRequest: 'error' });
}
