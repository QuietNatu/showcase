import '../src/styles/styles.scss';

import type { Preview } from '@storybook/react';
import { A11yParameters } from '@storybook/addon-a11y';

const preview: Preview = {
  parameters: {
    // TODO: configure axe
    a11y: {} satisfies A11yParameters['a11y'],
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
