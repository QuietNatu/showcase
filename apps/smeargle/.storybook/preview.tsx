import '../src/styles/styles.scss';
import type { Preview } from '@storybook/react';
import { storyA11yConfig, storyThemeDecorator } from '@natu/ui-react/stories';
import { mockI18n } from '@/mocks/i18n';
import { AppConfigContext } from '@/app/core/contexts/config/config-context';
import { appConfigMock } from '@/mocks/config';

const preview: Preview = {
  tags: ['autodocs'],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: storyA11yConfig,
    options: {
      storySort: {
        method: 'alphabetical',
      },
    },
  },
  globalTypes: {
    theme: {
      description: 'The visual theme of the story',
      defaultValue: 'smeargle',
      toolbar: {
        dynamicTitle: true,
        icon: 'paintbrush',
        items: [
          { value: 'ninjask', title: 'Ninjask' },
          { value: 'rotom', title: 'Rotom' },
          { value: 'smeargle', title: 'Smeargle' },
        ],
      },
    },
    colorScheme: {
      description: 'The color scheme of the story',
      defaultValue: 'light',
      toolbar: {
        dynamicTitle: true,
        icon: 'starhollow',
        items: [
          { value: 'light', title: 'Light' },
          { value: 'dark', title: 'Dark' },
        ],
      },
    },
  },
  loaders: [mockI18n],
  decorators: [
    storyThemeDecorator(),

    (Story) => {
      return (
        <AppConfigContext.Provider value={appConfigMock}>
          <Story />
        </AppConfigContext.Provider>
      );
    },
  ],
};

export default preview;
