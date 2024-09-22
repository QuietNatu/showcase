import { renderHook } from '@/test/render';
import { AppConfig, useAppConfig } from './config-context';
import { AppConfigProvider } from './config-provider';

test('renders when provider exists', () => {
  const expected = { example: 'example config' } as unknown as AppConfig;

  vi.stubGlobal('__natu_config__' satisfies keyof typeof window, expected);

  const { result } = renderHook(() => useAppConfig(), {
    renderOptions: {
      wrapper: ({ children }) => <AppConfigProvider>{children}</AppConfigProvider>,
    },
    providerOptions: { excludeAppConfig: true },
  });

  expect(result.current).toStrictEqual(expected);
});

test('throws error when provider does not exist', () => {
  vi.spyOn(console, 'error').mockImplementation(() => {});

  expect(() =>
    renderHook(() => useAppConfig(), {
      providerOptions: { excludeAppConfig: true },
    }),
  ).toThrow('missing AppConfigContext provider');
});
