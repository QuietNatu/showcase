import i18n from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import { setDefaultOptions } from 'date-fns';
import enGb from '@/locales/bundle/en-GB/translation.json';
import { useAppConfig } from '@/app/core/contexts/config-context';
import { ReactNode } from 'react';

export function I18nProviderMock(props: { children: ReactNode }) {
  const appConfig = useAppConfig();

  if (!i18n.isInitialized && !i18n.isInitializing) {
    setDefaultOptions({
      weekStartsOn: appConfig.date.weekStartsOn,
      firstWeekContainsDate: appConfig.date.firstWeekContainsDate,
    });

    void i18n.use(initReactI18next).init({
      debug: false,
      lng: 'en-GB',
      supportedLngs: ['en-GB'],

      resources: {
        'en-GB': { translation: enGb },
      },

      interpolation: {
        escapeValue: false, // react is already safe from xss => https://www.i18next.com/translation-function/interpolation#unescape
      },

      react: {
        useSuspense: false, // Resources are already loaded
      },
    });
  }

  return <I18nextProvider i18n={i18n}>{props.children}</I18nextProvider>;
}
