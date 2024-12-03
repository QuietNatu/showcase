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
import { mockI18n } from '@/mocks/i18n';
import { configure } from '@testing-library/angular';

// First, initialize the Angular testing environment.
getTestBed().initTestEnvironment(
  [BrowserDynamicTestingModule, GlobaltTestingSetupModule],
  platformBrowserDynamicTesting(),
);

beforeAll(async () => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  jasmine.addMatchers(JasmineDOM);
  jasmine.addMatchers(toHaveNoViolations);

  configure({
    dom: {
      // prevents large unhelpful HTML DOM outputs on failed tests
      getElementError: (message) => {
        const error = new Error(message ?? undefined);
        // eslint-disable-next-line functional/immutable-data
        error.name = 'TestingLibraryElementError';
        // eslint-disable-next-line functional/immutable-data
        error.stack = undefined;
        return error;
      },
    },
  });

  await mockWorker.start({ onUnhandledRequest: 'warn' });

  await mockI18n();
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
