// TODO: delete this once https://github.com/testing-library/jest-dom/issues/427 is solved
import matchers, { TestingLibraryMatchers } from '@testing-library/jest-dom/matchers';
import { toHaveNoViolations } from 'jest-axe';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Vi {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    interface JestAssertion<T = any>
      extends jest.Matchers<void, T>,
        TestingLibraryMatchers<T, void> {
      toHaveNoViolations(): T; // TODO: delete this once jest-axe stops referencing jest or when a vitest-axe alternative gets popular
    }
  }
}

expect.extend(matchers);
expect.extend(toHaveNoViolations);
