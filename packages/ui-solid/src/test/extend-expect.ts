import { TestingLibraryMatchers } from 'vitest-dom/dist/matchers';
import * as domMatchers from 'vitest-dom/matchers';
import * as axeMatchers from 'vitest-axe/matchers';

declare module 'vitest' {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  interface Assertion<T = any> extends TestingLibraryMatchers<typeof expect.stringContaining, T> {
    tohaveNoViolations: () => void;
  }
  interface AsymmetricMatchersContaining extends TestingLibraryMatchers<unknown, unknown> {
    tohaveNoViolations: () => void;
  }
}

expect.extend(domMatchers);
expect.extend(axeMatchers);
