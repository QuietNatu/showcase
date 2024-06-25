import { NatuUiConfigProvider, useNatuUiConfig } from './ui-config';
import { renderHook } from '../test';

test('renders when provider exists', () => {
  const { result } = renderHook(() => useNatuUiConfig(), {
    renderOptions: {
      wrapper: ({ children }) => <NatuUiConfigProvider value={{}}>{children}</NatuUiConfigProvider>,
    },
    providerOptions: { excludeUiConfig: true },
  });

  expect(result.current).toStrictEqual({});
});

test('renders when provider does not exist', () => {
  const { result } = renderHook(() => useNatuUiConfig(), {
    providerOptions: { excludeUiConfig: true },
  });

  expect(result.current).toStrictEqual({});
});
