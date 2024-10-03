/**
 * https://github.com/testing-library/react-testing-library/issues/1197
 */
export function workaroundTestingLibraryAdvanceTimers() {
  // eslint-disable-next-line functional/immutable-data, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-explicit-any
  (globalThis as any).jest = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ...(globalThis as any).jest,
    advanceTimersByTime: vi.advanceTimersByTime.bind(vi),
  };
}
