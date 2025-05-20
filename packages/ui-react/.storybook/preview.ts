import type { Preview } from '@storybook/react';
import { A11yParameters } from '@storybook/addon-a11y';
import { axeRules } from '@natu/axe';

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
