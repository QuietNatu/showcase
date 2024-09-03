import i18n from 'i18next';
import { setDefaultOptions } from 'date-fns';
import enGb from '../locales/bundle/en-GB/translation.json';
import { appConfigMock } from './config';

export function mockI18n() {
  const { weekStartsOn, firstWeekContainsDate } = appConfigMock.date;

  setDefaultOptions({ weekStartsOn, firstWeekContainsDate });

  return i18n.init({
    debug: false,
    lng: appConfigMock.i18n.defaultLanguage,
    supportedLngs: appConfigMock.i18n.supportedLanguages,

    resources: {
      'en-GB': { translation: enGb },
    },

    interpolation: {
      escapeValue: false, // angular is already safe from xss => https://www.i18next.com/translation-function/interpolation#unescape
    },
  });
}
