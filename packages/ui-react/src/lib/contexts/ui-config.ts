import { createContext } from '../utils';

export interface NatuUiConfig {
  tooltip?: {
    hoverDelay?: number;
  };
}

export const [NatuUiConfigProvider, useNatuUiConfig] = createContext<NatuUiConfig>({
  defaultValue: {},
  name: 'NatuUiConfigContext',
});
