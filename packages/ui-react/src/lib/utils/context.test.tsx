import { expect, test } from 'vitest';
import { renderHook } from 'vitest-browser-react';
import { createRequiredContext } from './context';

test('renders when provider exists', async () => {
  const [TestContext, useTest] = createRequiredContext<string>({ name: 'TestContext' });

  const { result } = await renderHook(() => useTest(), {
    wrapper: ({ children }) => <TestContext value="test">{children}</TestContext>,
  });

  expect(result.current).toBe('test');
});

test('does not render', async () => {
  const [, useTest] = createRequiredContext<string>({ name: 'TestContext' });

  await expect(() => renderHook(() => useTest())).rejects.toThrowError(
    'missing TestContext provider',
  );
});
