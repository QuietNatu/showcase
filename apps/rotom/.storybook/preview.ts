import '../src/styles/styles.scss';

import { setCompodocJson } from '@storybook/addon-docs/angular';
import docJson from './documentation.json';
import { A11yParameters } from '@storybook/addon-a11y';
import { axeRules } from '@natu/axe';
import { createThemeGlobalType, withTheme } from '@natu/stories';
import { applicationConfig, type Preview } from '@analogjs/storybook-angular';

setCompodocJson(docJson);

const preview: Preview = {
  parameters: {
    a11y: { config: { rules: axeRules } } satisfies A11yParameters,
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    options: {
      storySort: {
        method: 'alphabetical',
      },
    },
  },
  tags: ['autodocs'],
  globalTypes: {
    theme: createThemeGlobalType('rotom'),
  },
  decorators: [applicationConfig({ providers: [] }), withTheme()],
};

export default preview;
