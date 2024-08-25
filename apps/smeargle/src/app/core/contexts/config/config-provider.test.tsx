import { renderHook } from '@/test/render';
import { AppConfig, useAppConfig } from './config-context';
import { AppConfigProvider } from './config-provider';

// TODO: remove this once runtime config implemented
const appConfig: AppConfig = {
  date: {
    weekStartsOn: 1,
    firstWeekContainsDate: 4,
  },
  i18n: {
    supportedLanguages: ['en-GB', 'en-US', 'pt-PT'],
    fallbackLanguages: ['en-GB', 'pt-PT'],
    finalFallbackLanguage: 'en-GB',
  },
};

test('renders when provider exists', () => {
  const { result } = renderHook(() => useAppConfig(), {
    renderOptions: {
      wrapper: ({ children }) => <AppConfigProvider>{children}</AppConfigProvider>,
    },
    providerOptions: { excludeAppConfig: true },
  });

  expect(result.current).toStrictEqual(appConfig);
});

test('throws error when provider does not exist', () => {
  vi.spyOn(console, 'error').mockImplementation(() => {});

  expect(() =>
    renderHook(() => useAppConfig(), {
      providerOptions: { excludeAppConfig: true },
    }),
  ).toThrow('missing AppConfigContext provider');
});
