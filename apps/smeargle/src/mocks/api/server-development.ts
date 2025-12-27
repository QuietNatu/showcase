import { seedMockDatabase } from './seeds/seeds';
import { mockServer } from './server';

/** Starts the mock server with pre-seeded mock data. */
export async function startServer() {
  await seedMockDatabase();
  mockServer.listen({ onUnhandledRequest: 'error' });
}
