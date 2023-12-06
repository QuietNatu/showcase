import { componentWrapperDecorator, moduleMetadata, type Preview } from '@storybook/angular';
import { setCompodocJson } from '@storybook/addon-docs/angular';
import docJson from '../documentation.json';
import { StoryThemeComponent } from '../src/lib/stories/components';

setCompodocJson(docJson);

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
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
  decorators: [
    moduleMetadata({ imports: [StoryThemeComponent] }),
    componentWrapperDecorator(StoryThemeComponent, ({ globals }) => ({
      theme: globals['theme'],
      colorScheme: globals['colorScheme'],
    })),
  ],
};

export default preview;
