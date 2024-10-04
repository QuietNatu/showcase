import { seedDatabase } from './seeds/seed-database';
import { mockWorker } from './browser';

seedDatabase();

/**
 * Starts the mock service worker.
 */
export function startWorker() {
  return mockWorker.start({ waitUntilReady: true });
}
