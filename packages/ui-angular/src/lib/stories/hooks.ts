import { DOCUMENT } from '@angular/common';
import { Renderer2, effect, inject, signal } from '@angular/core';

/**
 * Sets up the theme of the story.
 */
export function useStoryThemeProvider(defaultOptions: { theme: string; colorScheme: string }) {
  const theme$ = signal<string>(defaultOptions.theme);
  const colorScheme$ = signal<string>(defaultOptions.colorScheme);

  const renderer = inject(Renderer2);
  const document = inject(DOCUMENT);

  effect(() => {
    renderer.setAttribute(document.documentElement, 'data-theme', theme$());
    renderer.setAttribute(document.documentElement, 'data-color-scheme', colorScheme$());
  });

  return {
    setTheme: (theme: string) => theme$.set(theme),
    setColorScheme: (colorScheme: string) => colorScheme$.set(colorScheme),
  };
}
