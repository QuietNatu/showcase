import '../src/app/styles/styles.scss';

import { axeRules } from '@natu/axe';
import { createThemeGlobalType, withTheme } from '@natu/stories';

import { faker } from '@faker-js/faker';
import type { A11yParameters } from '@storybook/addon-a11y';
import type { Preview } from '@storybook/react-vite';

const seed = 84;
faker.seed(seed);

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
    theme: createThemeGlobalType('smeargle'),
  },
  beforeEach: () => {
    faker.seed(seed);
  },
  decorators: [withTheme()],
};

export default preview;
