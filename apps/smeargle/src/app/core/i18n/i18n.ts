import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpBackend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import { setDefaultOptions } from 'date-fns';
import { getFallbackLanguage } from '@natu/utils';
import { appConfig } from '../config';

type Language = (typeof supportedLanguages)[number];

const supportedLanguages = ['en-GB', 'en-US', 'pt-PT'] as const;
const fallbackLanguages: Language[] = ['en-GB', 'pt-PT'];
const fallbackLanguage: Language = 'en-GB';

/* TODO: dependency injection */

export function setupI18n() {
  setDefaultOptions({
    weekStartsOn: appConfig.date.weekStartsOn,
    firstWeekContainsDate: appConfig.date.firstWeekContainsDate,
  });

  i18n.on('languageChanged', (language) => {
    updateDocumentLanguage(language);
  });

  void i18n
    .use(HttpBackend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      debug: import.meta.env.DEV,
      load: 'currentOnly',
      supportedLngs: supportedLanguages,
      fallbackLng: (language) => {
        return getFallbackLanguage(language, fallbackLanguages, fallbackLanguage);
      },

      interpolation: {
        escapeValue: false, // react is already safe from xss => https://www.i18next.com/translation-function/interpolation#unescape
      },

      detection: {
        order: ['localStorage', 'navigator'],
        lookupLocalStorage: 'language',
      },
    });
}

function updateDocumentLanguage(language: string) {
  document.documentElement.setAttribute('lang', language);
}
