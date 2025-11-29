import type { DecoratorFunction, GlobalTypes } from 'storybook/internal/types';

const themes = [
  { value: 'rotom', title: 'Rotom' },
  { value: 'rotom-dark', title: 'Rotom Dark' },
  { value: 'smeargle', title: 'Smeargle' },
  { value: 'smeargle-dark', title: 'Smeargle Dark' },
] as const;

/**
 * Provides a storybook widget to configure the theme of the stories.
 */
export function createThemeGlobalType(
  defaultTheme: (typeof themes)[number]['value'],
): GlobalTypes[string] {
  return {
    name: 'Theme',
    description: 'The visual theme of the story',
    defaultValue: defaultTheme,
    toolbar: {
      dynamicTitle: true,
      icon: 'paintbrush',
      items: themes,
    },
  };
}

/**
 * Sets up the theme of the story according to the storybook globals.
 */
export function withTheme(): DecoratorFunction {
  return (storyFn, context) => {
    // eslint-disable-next-line functional/immutable-data -- mutating dataset is allowed
    document.documentElement.dataset.theme = context.globals.theme as string;

    // eslint-disable-next-line @typescript-eslint/no-unsafe-return -- this is storybook's api
    return storyFn();
  };
}
