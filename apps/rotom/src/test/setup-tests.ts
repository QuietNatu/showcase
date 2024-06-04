// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import JasmineDOM from '@testing-library/jasmine-dom/dist';
import { toHaveNoViolations } from 'jasmine-axe';
import { getTestBed } from '@angular/core/testing';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting,
} from '@angular/platform-browser-dynamic/testing';
import { mockDatabase } from '@/mocks/server/database/database';
import { drop } from '@mswjs/data';
import { GlobaltTestingSetupModule } from './global-testing-setup.module';
import { mockWorker } from '@/mocks/server/browser';
import { deleteAllCookies } from '@natu/utils';

// First, initialize the Angular testing environment.
getTestBed().initTestEnvironment(
  [BrowserDynamicTestingModule, GlobaltTestingSetupModule],
  platformBrowserDynamicTesting(),
);

beforeAll(async () => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  jasmine.addMatchers(JasmineDOM);
  jasmine.addMatchers(toHaveNoViolations);
  await mockWorker.start({ onUnhandledRequest: 'warn' });
});

afterEach(() => {
  localStorage.clear();
  sessionStorage.clear();

  deleteAllCookies();

  mockWorker.resetHandlers();
  drop(mockDatabase);
});

afterAll(() => {
  mockWorker.stop();
});
