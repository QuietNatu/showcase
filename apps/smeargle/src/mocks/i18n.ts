import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { setDefaultOptions } from 'date-fns';
import enGb from '@/locales/bundle/en-GB/translation.json';
import { appConfigMock } from './config';

/**
 * Creates a mock i18n instance.
 */
export function mockI18n() {
  const { weekStartsOn, firstWeekContainsDate } = appConfigMock.date;

  setDefaultOptions({ weekStartsOn, firstWeekContainsDate });

  return i18n.use(initReactI18next).init({
    debug: false,
    lng: appConfigMock.i18n.defaultLanguage,
    supportedLngs: appConfigMock.i18n.supportedLanguages,

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
