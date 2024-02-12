import { InjectionToken } from '@angular/core';

export interface NatuUiConfig {
  tooltip?: {
    hoverDelay?: number;
  };
}

export const NATU_UI_CONFIG = new InjectionToken<NatuUiConfig>('NATU_UI_CONFIG');
