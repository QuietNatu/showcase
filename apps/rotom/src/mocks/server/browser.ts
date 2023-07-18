import { setupWorker } from 'msw';
import { handlers } from './handlers/handlers';

export const mockWorker = setupWorker(...handlers);
