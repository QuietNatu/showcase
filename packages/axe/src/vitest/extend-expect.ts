import { expect } from 'vitest';
import { toHaveNoViolations } from 'jest-axe';

interface AxeMatchers<R = unknown> {
  toHaveNoViolations: () => R;
}

declare module 'vitest' {
  interface Assertion<T = any> extends AxeMatchers<T> {}
  interface AsymmetricMatchersContaining extends AxeMatchers {}
}

expect.extend(toHaveNoViolations);
