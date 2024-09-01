import { AppConfig } from '@/app/core/tokens/config';

export const appConfigMock: AppConfig = {
  date: {
    weekStartsOn: 1,
    firstWeekContainsDate: 4,
  },
  i18n: {
    supportedLanguages: ['en-GB'],
    fallbackLanguages: ['en-GB'],
    defaultLanguage: 'en-GB',
  },
};
