import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { setDefaultOptions } from 'date-fns';
import { enGB as dateEnGb } from 'date-fns/locale/en-GB';
// TODO
// import enGB from '@/locales/en-GB/translation.json';

export function setupTestI18n() {
  /* TODO: use config for week starts on and firstweekcontains date */
  setDefaultOptions({ weekStartsOn: 1, firstWeekContainsDate: 4, locale: dateEnGb });

  void i18n.use(initReactI18next).init({
    debug: false,
    load: 'currentOnly',
    supportedLngs: ['en-GB'],

    resources: {
      'en-GB': {
        // TODO
        // translation: enGB,
      },
    },

    interpolation: {
      escapeValue: false, // react is already safe from xss => https://www.i18next.com/translation-function/interpolation#unescape
    },
  });
}
