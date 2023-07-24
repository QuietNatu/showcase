// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore

import JasmineDOM from '@testing-library/jasmine-dom/dist';
import { getTestBed } from '@angular/core/testing';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting,
} from '@angular/platform-browser-dynamic/testing';
import { GlobaltTestingSetupModule } from './global-testing-setup.module';
import { deleteAllCookies } from './utils/cookie';
import { toHaveNoViolations } from 'jasmine-axe';

// First, initialize the Angular testing environment.
getTestBed().initTestEnvironment(
  [BrowserDynamicTestingModule, GlobaltTestingSetupModule],
  platformBrowserDynamicTesting(),
);

beforeAll(() => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  jasmine.addMatchers(JasmineDOM);
  jasmine.addMatchers(toHaveNoViolations);
});

afterEach(() => {
  localStorage.clear();
  sessionStorage.clear();

  deleteAllCookies();
});
