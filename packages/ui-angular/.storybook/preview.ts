import { applicationConfig, moduleMetadata, type Preview } from '@storybook/angular';
import { setCompodocJson } from '@storybook/addon-docs/angular';
import docJson from '../documentation.json';
import { StoryConfigDirective, storyConfigDecorator } from './decorators';
import { storyA11yConfig } from '../src/lib/stories';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideUiConfig } from '../src';
import { provideZoneChangeDetection } from '@angular/core';
import { mockI18n } from '../src/mocks/i18n';

setCompodocJson(docJson);

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
      defaultValue: 'rotom',
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
    applicationConfig({
      providers: [
        provideZoneChangeDetection({ eventCoalescing: true }),
        provideAnimations(),
        provideUiConfig(),
      ],
    }),
    moduleMetadata({ imports: [StoryConfigDirective] }),
    storyConfigDecorator(),
  ],
};

export default preview;
