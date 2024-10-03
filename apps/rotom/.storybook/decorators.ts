import { Decorator, componentWrapperDecorator } from '@storybook/angular';
import { Directive, input } from '@angular/core';
import { useStoryThemeProvider } from '@natu/ui-angular/stories';
import { registerEffect } from '@natu/ui-angular';

/**
 * Performs actions required to set up stories (like themes or i18n).
 */
export function storyConfigDecorator(): Decorator {
  return componentWrapperDecorator(
    (story) =>
      `<ng-container appStoryConfig [theme]="theme" [colorScheme]="colorScheme">${story}</ng-container>`,
    ({ globals }) => ({
      theme: globals.theme as string,
      colorScheme: globals.colorScheme as string,
    }),
  );
}

/**
 * Performs actions required to set up stories (like themes or i18n).
 */
@Directive({
  selector: '[appStoryConfig]',
  standalone: true,
})
export class StoryConfigDirective {
  readonly theme = input.required<string>();
  readonly colorScheme = input.required<string>();

  private readonly themeProvider = useStoryThemeProvider();

  /**
   *
   */
  constructor() {
    registerEffect(this.theme, (theme) => {
      this.themeProvider.setTheme(theme);
    });

    registerEffect(this.colorScheme, (colorScheme) => {
      this.themeProvider.setColorScheme(colorScheme);
    });
  }
}
