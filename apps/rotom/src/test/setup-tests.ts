import '@angular/compiler';
import '@analogjs/vitest-angular/setup-snapshots';
import '@analogjs/vitest-angular/setup-serializers';
import '@natu/axe/vitest/extend-expect';

import { setupTestBed } from '@analogjs/vitest-angular/setup-testbed';
import { faker } from '@faker-js/faker';
import { afterAll, afterEach, beforeAll } from 'vitest';

import { mockWorker } from '../mocks/api/browser';

// eslint-disable-next-line vitest/require-hook -- setup breaks if done inside vitest hooks
setupTestBed({
  browserMode: true,
  teardown: { destroyAfterEach: false },
});

beforeAll(async () => {
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
