import { Injectable, TemplateRef, computed, signal } from '@angular/core';

/* TODO: decide if it should only have content or should have title + other sections */

@Injectable()
export class NatuPopoverService {
  readonly textContent$;
  readonly templateContent$;
  readonly templateContext$;

  private readonly contentSignal$ = signal<string | TemplateRef<unknown> | null>(null);
  private readonly templateContextSignal$ = signal<object | null>(null);

  constructor() {
    this.textContent$ = computed(() => {
      const content = this.contentSignal$();
      return typeof content === 'string' ? content : null;
    });

    this.templateContent$ = computed(() => {
      const content = this.contentSignal$();
      return content instanceof TemplateRef ? content : null;
    });

    this.templateContext$ = this.templateContextSignal$.asReadonly();
  }

  setContent(content: string | TemplateRef<unknown>) {
    this.contentSignal$.set(content);
  }

  setTemplateContext(context: object | null) {
    this.templateContextSignal$.set(context);
  }
}
