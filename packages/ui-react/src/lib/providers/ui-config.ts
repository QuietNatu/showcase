import { createContext } from '../hooks';

interface NatuUiConfig {
  tooltip: {
    hoverDelay: number;
  };
}

export const [NatuUiConfigProvider, useNatuUiConfig] = createContext<Partial<NatuUiConfig>>({
  defaultValue: {},
  name: 'NatuUiConfigContext',
});
