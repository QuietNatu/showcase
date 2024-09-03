import { applicationConfig, moduleMetadata, type Preview } from '@storybook/angular';
import { setCompodocJson } from '@storybook/addon-docs/angular';
import docJson from '../documentation.json';
import { storyConfigDecorator, StoryConfigDirective } from './decorators';
import { storyA11yConfig } from '@natu/ui-angular/stories';
import { provideZoneChangeDetection } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { mockI18n } from '@/mocks/i18n';
import { APP_CONFIG } from '@/app/core/tokens/config';
import { appConfigMock } from '@/mocks/config';

setCompodocJson(docJson);

const preview: Preview = {
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
        { provide: APP_CONFIG, useValue: appConfigMock },
      ],
    }),
    moduleMetadata({ imports: [StoryConfigDirective] }),
    storyConfigDecorator(),
  ],
};

export default preview;
