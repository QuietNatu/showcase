import { renderHook } from '../../test/render';
import { createContext } from './context';

test('renders when context has a default value', () => {
  const [, useTest] = createContext<string | undefined>({
    defaultValue: 'test',
    name: 'TestContext',
  });

  const { result } = renderHook(useTest);

  expect(result.current).toBe('test');
});

test('renders when provider exists', () => {
  const [TestProvider, useTest] = createContext<string | undefined>({
    name: 'TestContext',
  });

  const { result } = renderHook(useTest, {
    renderOptions: {
      wrapper: ({ children }) => <TestProvider value="test">{children}</TestProvider>,
    },
  });

  expect(result.current).toBe('test');
});

test('does not render', () => {
  const logErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

  const [, useTest] = createContext<string | undefined>({
    name: 'TestContext',
  });

  expect(() => renderHook(useTest)).toThrow('missing TestContext provider');

  logErrorSpy.mockRestore();
});
