// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore

import JasmineDOM from '@testing-library/jasmine-dom/dist';
import { getTestBed } from '@angular/core/testing';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting,
} from '@angular/platform-browser-dynamic/testing';
import { GlobaltTestingSetupModule } from './global-testing-setup.module';
import { toHaveNoViolations } from 'jasmine-axe';
import { deleteAllCookies } from '@natu/utils';
import { mockI18n } from '../mocks/i18n';
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

  await mockI18n();
});

afterEach(() => {
  localStorage.clear();
  sessionStorage.clear();

  deleteAllCookies();
});
