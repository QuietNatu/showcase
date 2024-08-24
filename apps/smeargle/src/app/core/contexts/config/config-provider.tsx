import { ReactNode } from 'react';
import { _AppConfigProvider, AppConfig } from './config-context';

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

export function AppConfigProvider(props: { children: ReactNode }) {
  return <_AppConfigProvider value={appConfig}>{props.children}</_AppConfigProvider>;
}
