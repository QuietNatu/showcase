import { APP_INITIALIZER, Injector } from '@angular/core';
import { Decorator, componentWrapperDecorator } from '@storybook/angular';

/**
 * Adds a gap between variants on a story that showcases them.
 */
export function storyVariantsDecorator<TArgs>(): Decorator<TArgs> {
  return componentWrapperDecorator(
    (story) => `<div style="display: flex; gap: 10px">${story}</div>`,
  );
}

/**
 * Used to initialize data before running the stories.
 *
 * Gives access to the injector to inject services that need to be configured for the stories.
 */
export function onStoryInitDecorator<TArgs>(
  callback: (injector: Injector) => void | Promise<unknown>,
): Decorator<TArgs> {
  return (storyFn) => {
    const story = storyFn();

    if (!story.applicationConfig) {
      // eslint-disable-next-line functional/immutable-data
      story.applicationConfig = { providers: [] };
    }

    // eslint-disable-next-line functional/immutable-data
    story.applicationConfig.providers.unshift({
      provide: APP_INITIALIZER,
      useFactory: (injector: Injector) => () => callback(injector),
      multi: true,
      deps: [Injector],
    });

    return story;
  };
}
