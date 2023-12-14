import * as domMatchers from '@testing-library/jest-dom/matchers';
import type { TestingLibraryMatchers } from '@testing-library/jest-dom/matchers';
import * as axeMatchers from 'vitest-axe/matchers';
import type { AxeMatchers } from 'vitest-axe';

declare module 'vitest' {
  export interface JestAssertion<T>
    extends TestingLibraryMatchers<ReturnType<typeof expect.stringContaining>, T> {}
  export interface Assertion extends AxeMatchers {}
  export interface AsymmetricMatchersContaining extends AxeMatchers {}
}

expect.extend(axeMatchers);
expect.extend(domMatchers);
