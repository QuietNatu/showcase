import { Decorator, componentWrapperDecorator } from '@storybook/angular';
import { Directive, Input } from '@angular/core';
import { useStoryThemeProvider } from '@natu/ui-angular/stories';

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
  /* TODO: enum */
  @Input({ required: true }) set theme(theme: string) {
    this.themeProvider.setTheme(theme);
  }

  /* TODO: enum */
  @Input({ required: true }) set colorScheme(colorScheme: string) {
    this.themeProvider.setColorScheme(colorScheme);
  }

  private readonly themeProvider = useStoryThemeProvider({ theme: 'rotom', colorScheme: 'light' });
}
