import './styles.scss';

import type { Preview } from '@storybook/react-vite';
import { A11yParameters } from '@storybook/addon-a11y';
import { axeRules } from '@natu/axe';
import { createThemeGlobalType, withTheme } from '@natu/stories';

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
  decorators: [withTheme()],
};

export default preview;
