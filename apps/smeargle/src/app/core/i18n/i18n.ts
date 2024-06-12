import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpBackend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import { Locale, setDefaultOptions } from 'date-fns';

/* TODO: html lang */

type Language = (typeof supportedLanguages)[number];

const supportedLanguages = ['en-GB', 'en-US', 'pt-PT'] as const;
const regionalFallbackLanguages = ['en-GB', 'pt-PT'] as const satisfies Language[];
const fallbackLanguage: Language = 'en-GB';
const dateLocales: Record<Language, () => Promise<Locale>> = {
  'en-GB': () => import(`date-fns/locale/en-GB`).then((m) => m.enGB),
  'en-US': () => import(`date-fns/locale/en-US`).then((m) => m.enUS),
  'pt-PT': () => import(`date-fns/locale/pt`).then((m) => m.pt),
};

export function setupI18n() {
  /* TODO: use config for week starts on and firstweekcontains date */
  setDefaultOptions({ weekStartsOn: 1, firstWeekContainsDate: 4 });

  i18n.on('languageChanged', (language) => {
    // TODO
    void updateDateLocale(language as Language);
  });

  void i18n
    .use(HttpBackend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      debug: import.meta.env.DEV,
      load: 'currentOnly',
      supportedLngs: supportedLanguages,
      fallbackLng: (language = fallbackLanguage) => {
        return getRegionalFallbackLanguage(language, regionalFallbackLanguages) ?? fallbackLanguage;
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

async function updateDateLocale(language: Language) {
  /* TODO: needs to be language without culture? */

  /* TODO: trigger suspense */
  /* TODO: use this in the future https://react.dev/reference/react/use */

  // TODO
  // console.log({ dateLocaleLanguage: language });
  /* TODO: try catch ?
   */

  setDefaultOptions({ locale: await dateLocales[language]() });
}

// TODO: move to utils
function getRegionalFallbackLanguage(
  language: string,
  regionalFallbackLanguages: string[],
): string | undefined {
  const regionlessLanguage = createRegionlessLanguage(language);

  const fallbackLanguageDictionary = regionalFallbackLanguages.reduce<Record<string, string>>(
    (dictionary, language) => {
      const regionlessLanguage = createRegionlessLanguage(language);

      // eslint-disable-next-line functional/immutable-data
      dictionary[regionlessLanguage] = language;

      return dictionary;
    },
    {},
  );

  return fallbackLanguageDictionary[regionlessLanguage];
}

// TODO: move to utils
function createRegionlessLanguage(language: string) {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  return language.split('-')[0]!;
}
