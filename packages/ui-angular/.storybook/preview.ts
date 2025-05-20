import 'zone.js';

import type { Preview } from '@storybook/angular';
import { setCompodocJson } from '@storybook/addon-docs/angular';
import docJson from './documentation.json';
import { A11yParameters } from '@storybook/addon-a11y';
import { axeRules } from '@natu/axe';

setCompodocJson(docJson);

const preview: Preview = {
  parameters: {
    a11y: { config: { rules: axeRules } } satisfies A11yParameters['a11y'],
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
};

export default preview;
