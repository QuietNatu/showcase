import '@angular/compiler';
import '@analogjs/vitest-angular/setup-snapshots';
import '@analogjs/vitest-angular/setup-serializers';
import '@natu/axe/vitest/extend-expect';

import { setupTestBed } from '@analogjs/vitest-angular/setup-testbed';

import { afterAll, afterEach, beforeAll } from 'vitest';

import { mockWorker } from '../mocks/api/browser';
import { faker } from '@faker-js/faker';

beforeAll(async () => {
  setupTestBed({
    browserMode: true,
    teardown: { destroyAfterEach: false },
  });

  faker.seed(21);
  await mockWorker.start({ onUnhandledRequest: 'warn' });
});

afterEach(() => {
  faker.seed(21);
  mockWorker.resetHandlers();
});

afterAll(() => {
  mockWorker.stop();
});
