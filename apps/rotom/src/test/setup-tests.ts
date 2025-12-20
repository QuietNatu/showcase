import { afterAll, afterEach, beforeAll } from 'vitest';
import '@natu/axe/vitest/extend-expect';

import { BrowserTestingModule, platformBrowserTesting } from '@angular/platform-browser/testing';
import { getTestBed } from '@angular/core/testing';
import { GlobalTestingModule } from './global-testing-module';
import { mockWorker } from '../mocks/api/browser';

beforeAll(async () => {
  getTestBed().initTestEnvironment(
    [BrowserTestingModule, GlobalTestingModule],
    platformBrowserTesting(),
  );

  await mockWorker.start({ onUnhandledRequest: 'warn' });
});

afterEach(() => {
  mockWorker.resetHandlers();
});

afterAll(() => {
  mockWorker.stop();
});
