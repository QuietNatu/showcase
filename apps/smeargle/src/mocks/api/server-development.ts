import { setupServer } from 'msw/node';
import { developmentHandlers } from './handlers/handlers';
import { seedMockDatabase } from './seeds/seeds';

/** Starts the mock server with pre-seeded mock data. */
export async function startMockServer() {
  await seedMockDatabase();
  setupServer(...developmentHandlers).listen({ onUnhandledRequest: 'error' });
}
