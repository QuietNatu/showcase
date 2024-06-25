import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { setDefaultOptions } from 'date-fns';
import enGb from '@/locales/bundle/en-GB/translation.json';
import { appConfig } from '@/app/core/config';

/* TODO: dependency injection */
export function setupTestI18n() {
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

  return i18n;
}
