import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { setDefaultOptions } from 'date-fns';
import { enGB as dateEnGb } from 'date-fns/locale/en-GB';
import locales from 'virtual:i18n';

// TODO: provide i18n in tests

export function setupTestI18n() {
  setDefaultOptions({ weekStartsOn: 1, firstWeekContainsDate: 4, locale: dateEnGb });

  void i18n.use(initReactI18next).init({
    debug: false,
    load: 'currentOnly',
    supportedLngs: ['en-GB'],

    resources: {
      'en-GB': {
        translation: locales.get('en-GB') ?? {},
      },
    },

    interpolation: {
      escapeValue: false, // react is already safe from xss => https://www.i18next.com/translation-function/interpolation#unescape
    },
  });
}
