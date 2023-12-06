import {
  ChangeDetectionStrategy,
  Component,
  Input,
  Renderer2,
  effect,
  inject,
  signal,
} from '@angular/core';
import { DOCUMENT } from '@angular/common';

// TODO: think if this should be a generic component for multiple things ex: I18n to avoid multiple rendered components

/**
 * Sets up the theme of the story.
 */
@Component({
  selector: 'natu-story-theme',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  template: '<ng-content />',
})
export class StoryThemeComponent {
  @Input({ required: true }) set theme(theme: string) {
    this.theme$.set(theme);
  }

  @Input({ required: true }) set colorScheme(colorScheme: string) {
    this.colorScheme$.set(colorScheme);
  }

  private readonly theme$ = signal<string>('rotom'); // TODO: enum
  private readonly colorScheme$ = signal<string>('light'); // TODO: enum

  private readonly renderer = inject(Renderer2);
  private readonly document = inject(DOCUMENT);

  constructor() {
    effect(() => {
      const documentElement = this.document.documentElement;
      this.renderer.setAttribute(documentElement, 'data-theme', this.theme$());
      this.renderer.setAttribute(documentElement, 'data-color-scheme', this.colorScheme$());
    });
  }
}
