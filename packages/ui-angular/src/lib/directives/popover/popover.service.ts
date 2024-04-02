import { Injectable, TemplateRef, computed, signal } from '@angular/core';

@Injectable()
export class NatuPopoverService {
  readonly textTitle$;
  readonly templateTitle$;
  readonly templateTitleContext$;
  readonly textContent$;
  readonly templateContent$;
  readonly templateContentContext$;

  private readonly title$ = signal<string | TemplateRef<unknown> | null>(null);
  private readonly templateTitleContextSignal$ = signal<object | null>(null);
  private readonly content$ = signal<string | TemplateRef<unknown> | null>(null);
  private readonly templateContentContextSignal$ = signal<object | null>(null);

  constructor() {
    this.textTitle$ = computed(() => {
      const title = this.title$();
      return typeof title === 'string' ? title : null;
    });

    this.templateTitle$ = computed(() => {
      const title = this.title$();
      return title instanceof TemplateRef ? title : null;
    });

    this.templateTitleContext$ = this.templateTitleContextSignal$.asReadonly();

    this.textContent$ = computed(() => {
      const content = this.content$();
      return typeof content === 'string' ? content : null;
    });

    this.templateContent$ = computed(() => {
      const content = this.content$();
      return content instanceof TemplateRef ? content : null;
    });

    this.templateContentContext$ = this.templateContentContextSignal$.asReadonly();
  }

  setTitle(title: string | TemplateRef<unknown>) {
    this.title$.set(title);
  }

  setTitleContext(context: object | null) {
    this.templateTitleContextSignal$.set(context);
  }

  setContent(content: string | TemplateRef<unknown>) {
    this.content$.set(content);
  }

  setContentContext(context: object | null) {
    this.templateContentContextSignal$.set(context);
  }
}
