import { createElement, JSXElementConstructor, ReactNode } from 'react';
import { act } from '@testing-library/react';

type TestWrapper = undefined | false | JSXElementConstructor<{ children: ReactNode }>;

/**
 * Waits for any kind of async calculations to complete.
 *
 * Useful for example when testing components that automatically re-render (like: overlays)
 */
export function waitForAsyncActions() {
  // eslint-disable-next-line testing-library/no-unnecessary-act
  return act(async () => {});
}

/**
 * Creates a test wrapper with all the provided wrappers, filters out falsy wrappers.
 */
export function createTestWrapper(wrappers: TestWrapper[]) {
  return ({ children }: { children: ReactNode }) => applyWrappers(children, wrappers);
}

function applyWrappers(children: ReactNode, wrappers: TestWrapper[]) {
  return wrappers.reduceRight(
    (children, wrapper) => (wrapper ? createElement(wrapper, null, children) : children),
    children,
  );
}
