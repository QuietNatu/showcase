import '@analogjs/vitest-angular/setup-zone';
import '@natu/axe/vitest/extend-expect';

import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting,
} from '@angular/platform-browser-dynamic/testing';
import { getTestBed } from '@angular/core/testing';
import { GlobalTestingModule } from './global-testing-module';

beforeAll(() => {
  getTestBed().initTestEnvironment(
    [BrowserDynamicTestingModule, GlobalTestingModule],
    platformBrowserDynamicTesting(),
  );
});
