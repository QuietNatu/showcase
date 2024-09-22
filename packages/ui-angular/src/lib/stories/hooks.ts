import { DOCUMENT } from '@angular/common';
import { Renderer2, effect, inject, signal } from '@angular/core';

/**
 * Sets up the theme of the story.
 */
export function useStoryThemeProvider() {
  const theme$ = signal<string>('');
  const colorScheme$ = signal<string>('');

  const renderer = inject(Renderer2);
  const document = inject(DOCUMENT);

  effect(() => {
    renderer.setAttribute(document.documentElement, 'data-theme', theme$());
    renderer.setAttribute(document.documentElement, 'data-color-scheme', colorScheme$());
  });

  return {
    setTheme: (theme: string) => {
      theme$.set(theme);
    },
    setColorScheme: (colorScheme: string) => {
      colorScheme$.set(colorScheme);
    },
  };
}
