import { seedMockDatabase } from './seeds/seeds';
import { mockWorker } from './browser';

/** Starts the mock service worker with pre-seeded mock data. */
export async function startWorker() {
  await seedMockDatabase();
  return mockWorker.start({ onUnhandledRequest: 'error' });
}
