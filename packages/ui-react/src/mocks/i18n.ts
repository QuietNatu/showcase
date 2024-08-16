import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { setDefaultOptions } from 'date-fns';
import enGb from '../locales/en-GB/translation.json';

export function setupI18n() {
  setDefaultOptions({ weekStartsOn: 1, firstWeekContainsDate: 4 });

  return i18n.use(initReactI18next).init({
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
