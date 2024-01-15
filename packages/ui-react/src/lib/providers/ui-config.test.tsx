import { NatuUiConfigProvider, useNatuUiConfig } from '.';
import { renderHook } from '../test';

test('renders when provider exists', () => {
  const { result } = renderHook(() => useNatuUiConfig(), {
    renderOptions: {
      wrapper: ({ children }) => <NatuUiConfigProvider value={{}}>{children}</NatuUiConfigProvider>,
    },
  });

  expect(result.current).toStrictEqual({});
});

test('renders when provider does not exist', () => {
  const { result } = renderHook(() => useNatuUiConfig());

  expect(result.current).toStrictEqual({});
});
