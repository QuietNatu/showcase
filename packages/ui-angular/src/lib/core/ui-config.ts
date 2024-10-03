import { InjectionToken, makeEnvironmentProviders } from '@angular/core';
import { provideSvgIconsConfig } from '@ngneat/svg-icon';

export interface NatuUiConfig {
  iconConfig?: Partial<Parameters<typeof provideSvgIconsConfig>[0]>;
  tooltip?: {
    hoverDelay?: number;
  };
}

export const NATU_UI_CONFIG = new InjectionToken<NatuUiConfig>('NATU_UI_CONFIG');

/**
 * Provides a default configuration for ui dependencies.
 */
export function provideUiConfig(config: Partial<NatuUiConfig> = {}) {
  const adjustedConfig = {
    ...config,
    iconConfig: { defaultSize: 'null', ...config.iconConfig },
  } satisfies NatuUiConfig;

  return makeEnvironmentProviders([
    provideSvgIconsConfig(adjustedConfig.iconConfig),
    { provide: NATU_UI_CONFIG, useValue: adjustedConfig },
  ]);
}
