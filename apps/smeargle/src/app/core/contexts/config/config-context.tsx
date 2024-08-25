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

export const [_AppConfigProvider, useAppConfig] = createContext<AppConfig>({
  name: 'AppConfigContext',
});
