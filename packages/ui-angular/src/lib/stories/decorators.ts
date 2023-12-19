import { Decorator, componentWrapperDecorator } from '@storybook/angular';

export function storyVariantsDecorator<TArgs>(): Decorator<TArgs> {
  return componentWrapperDecorator(
    (story) => `<div style="display: flex; gap: 10px">${story}</div>`,
  );
}
