import { createContext } from '@natu/ui-react';
import { Day, FirstWeekContainsDate } from 'date-fns';

export interface AppConfig {
  date: {
    weekStartsOn: Day;
    firstWeekContainsDate: FirstWeekContainsDate;
  };
  i18n: {
    supportedLanguages: string[];
    fallbackLanguages: string[];
    finalFallbackLanguage: string;
  };
}

/* TODO: make this runtime with requests */

const appConfig: AppConfig = {
  date: {
    weekStartsOn: 1,
    firstWeekContainsDate: 4,
  },
  i18n: {
    supportedLanguages: ['en-GB', 'en-US', 'pt-PT'],
    fallbackLanguages: ['en-GB', 'pt-PT'],
    finalFallbackLanguage: 'en-GB',
  },
};

// TODO: test
// TODO: docs
export const [AppConfigProvider, useAppConfig] = createContext<AppConfig>({
  name: 'AppConfigContext',
  defaultValue: appConfig,
});
