import 'i18next';

import translation from '../locales/bundle/en-GB/translation.json';

declare module 'i18next' {
  interface CustomTypeOptions {
    resources: {
      translation: typeof translation;
    };
  }
}
