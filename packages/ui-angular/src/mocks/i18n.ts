import i18n from 'i18next';
import { setDefaultOptions } from 'date-fns';
import enGb from '../locales/en-GB/translation.json';

/**
 * Creates a mock i18n instance.
 */
export function mockI18n() {
  setDefaultOptions({ weekStartsOn: 1, firstWeekContainsDate: 4 });

  return i18n.init({
    debug: false,
    lng: 'en-GB',
    supportedLngs: ['en-GB'],

    resources: {
      'en-GB': { translation: enGb },
    },

    interpolation: {
      escapeValue: false, // angular is already safe from xss => https://www.i18next.com/translation-function/interpolation#unescape
    },
  });
}
