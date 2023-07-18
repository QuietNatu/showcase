import { seedDatabase } from './seeds/seed-database';
import { mockWorker } from './browser';

seedDatabase();

export function startWorker() {
  return mockWorker.start({ waitUntilReady: true });
}
