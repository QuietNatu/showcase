import { APP_INITIALIZER, EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';
import { NATU_I18N_INSTANCE } from '@natu/ui-angular';
import i18next from 'i18next';
import resourcesToBackend from 'i18next-resources-to-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import { environment } from '@/environments/environment';
import { APP_CONFIG, AppConfig } from '../tokens/config';
import { getFallbackLanguage } from '@natu/utils';

/**
 * Sets up providers to enable internationalization in the app.
 */
export function provideAppI18n(): EnvironmentProviders {
  return makeEnvironmentProviders([
    { provide: NATU_I18N_INSTANCE, useValue: i18next },
    { provide: APP_INITIALIZER, useFactory: initI18n, multi: true, deps: [APP_CONFIG] },
  ]);
}

function initI18n(appConfig: AppConfig) {
  return () => {
    i18next.on('languageChanged', updateDocumentLanguage);

    return i18next
      .use(
        resourcesToBackend(
          (language: string, namespace: string) =>
            import(`../../../locales/bundle/${language}/${namespace}.json`),
        ),
      )
      .use(LanguageDetector)
      .init({
        debug: environment.isProd === true,
        load: 'currentOnly',
        supportedLngs: appConfig.i18n.supportedLanguages,
        fallbackLng: (language) => {
          return getFallbackLanguage(
            language,
            appConfig.i18n.fallbackLanguages,
            appConfig.i18n.defaultLanguage,
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
  };
}

function updateDocumentLanguage(language: string) {
  document.documentElement.setAttribute('lang', language);
}
