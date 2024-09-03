import { inject, InjectionToken } from '@angular/core';
import { Day, FirstWeekContainsDate } from 'date-fns';
import { WINDOW } from './window';

export interface AppConfig {
  date: {
    weekStartsOn: Day;
    firstWeekContainsDate: FirstWeekContainsDate;
  };
  i18n: {
    supportedLanguages: string[];
    fallbackLanguages: string[];
    defaultLanguage: string;
  };
}

export const APP_CONFIG = new InjectionToken('APP_CONFIG', {
  factory: () => inject(WINDOW).__natu_config__,
});
