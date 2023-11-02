import { setupWorker } from 'msw/browser';
import { handlers } from './handlers/handlers';
import { seedDatabase } from './seeds/seed-database';

seedDatabase();

export const mockWorker = setupWorker(...handlers);
