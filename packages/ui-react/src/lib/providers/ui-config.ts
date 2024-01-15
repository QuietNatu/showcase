import { createContext } from '../hooks';

export interface NatuUiConfig {
  tooltip?: {
    hoverDelay?: number;
  };
}

export const [NatuUiConfigProvider, useNatuUiConfig] = createContext<NatuUiConfig>({
  defaultValue: {},
  name: 'NatuUiConfigContext',
});
