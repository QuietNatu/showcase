import { Decorator, componentWrapperDecorator } from '@storybook/angular';
import { Directive, input } from '@angular/core';
import { useStoryThemeProvider } from '@natu/ui-angular/stories';
import { connectSignal } from '@natu/ui-angular';

/**
 * Performs actions required to set up stories (like themes or i18n).
 */
export function storyConfigDecorator(): Decorator {
  return componentWrapperDecorator(
    (story) =>
      `<ng-container natuStoryConfig [theme]="theme" [colorScheme]="colorScheme">${story}</ng-container>`,
    ({ globals }) => ({
      theme: globals['theme'] as string,
      colorScheme: globals['colorScheme'] as string,
    }),
  );
}

/**
 * Performs actions required to set up stories (like themes or i18n).
 */
@Directive({
  selector: '[natuStoryConfig]',
  standalone: true,
})
export class StoryConfigDirective {
  readonly theme = input.required<string>();
  readonly colorScheme = input.required<string>();

  private readonly themeProvider = useStoryThemeProvider();

  constructor() {
    connectSignal(this.theme, (theme) => {
      this.themeProvider.setTheme(theme);
    });

    connectSignal(this.colorScheme, (colorScheme) => {
      this.themeProvider.setColorScheme(colorScheme);
    });
  }
}
