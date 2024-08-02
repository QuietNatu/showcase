import { ReactNode, useRef } from 'react';
import { AppConfig, useAppConfig } from './config-context';
import { setDefaultOptions } from 'date-fns';
import i18n from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import resourcesToBackend from 'i18next-resources-to-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import { getFallbackLanguage } from '@natu/utils';

/* TODO: disable coverage */

/**
 * TODO
 */
export function AppI18nProvider(props: { children: ReactNode }) {
  const appConfig = useAppConfig();
  const appConfigRef = useRef<AppConfig>();

  if (appConfig !== appConfigRef.current) {
    // eslint-disable-next-line functional/immutable-data
    appConfigRef.current = appConfig;

    setDefaultOptions({
      weekStartsOn: appConfig.date.weekStartsOn,
      firstWeekContainsDate: appConfig.date.firstWeekContainsDate,
    });
  }

  if (!i18n.isInitialized && !i18n.isInitializing) {
    i18n.on('languageChanged', updateDocumentLanguage);

    void i18n
      .use(
        resourcesToBackend(
          (language: string, namespace: string) =>
            import(`../../../locales/bundle/${language}/${namespace}.json`),
        ),
      )
      .use(LanguageDetector)
      .use(initReactI18next)
      .init({
        debug: import.meta.env.DEV,
        load: 'currentOnly',
        supportedLngs: appConfig.i18n.supportedLanguages,
        fallbackLng: (language) => {
          return getFallbackLanguage(
            language,
            appConfig.i18n.fallbackLanguages,
            appConfig.i18n.finalFallbackLanguage,
          );
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

  return <I18nextProvider i18n={i18n}>{props.children}</I18nextProvider>;
}

function updateDocumentLanguage(language: string) {
  document.documentElement.setAttribute('lang', language);
}
