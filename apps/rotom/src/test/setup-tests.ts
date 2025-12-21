import { afterAll, afterEach, beforeAll } from 'vitest';
import '@natu/axe/vitest/extend-expect';

import { setupTestBed } from '@analogjs/vitest-angular/setup-testbed';
import { mockWorker } from '../mocks/api/browser';

beforeAll(async () => {
  setupTestBed({ browserMode: true });

  await mockWorker.start({ onUnhandledRequest: 'warn' });
});

afterEach(() => {
  mockWorker.resetHandlers();
});

afterAll(() => {
  mockWorker.stop();
});
