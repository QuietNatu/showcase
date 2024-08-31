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

// First, initialize the Angular testing environment.
getTestBed().initTestEnvironment(
  [BrowserDynamicTestingModule, GlobaltTestingSetupModule],
  platformBrowserDynamicTesting(),
);

beforeAll(async () => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  jasmine.addMatchers(JasmineDOM);
  jasmine.addMatchers(toHaveNoViolations);

  await mockI18n();
});

afterEach(() => {
  localStorage.clear();
  sessionStorage.clear();

  deleteAllCookies();
});
