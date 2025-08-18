import { beforeAll } from 'vitest';
import '@analogjs/vitest-angular/setup-zone';
import '@natu/axe/vitest/extend-expect';

import { BrowserTestingModule, platformBrowserTesting } from '@angular/platform-browser/testing';
import { getTestBed } from '@angular/core/testing';
import { GlobalTestingModule } from './global-testing-module';

beforeAll(() => {
  getTestBed().initTestEnvironment(
    [BrowserTestingModule, GlobalTestingModule],
    platformBrowserTesting(),
  );
});
