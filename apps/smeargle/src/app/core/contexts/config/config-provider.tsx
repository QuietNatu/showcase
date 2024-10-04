import { ReactNode } from 'react';
import { AppConfigContext } from './config-context';

/**
 * Provides app config to consumers.
 */
export function AppConfigProvider(props: Readonly<{ children: ReactNode }>) {
  return (
    <AppConfigContext.Provider value={window.__natu_config__}>
      {props.children}
    </AppConfigContext.Provider>
  );
}
