import {
  Directive,
  effect,
  inject,
  input,
  TemplateRef,
  untracked,
  ViewContainerRef,
} from '@angular/core';
import { DefaultNamespace, KeyPrefix, TFunction } from 'i18next';
import { injectTranslationFunction } from './translation-function';

interface Options<TKPrefix extends KeyPrefix<DefaultNamespace>> {
  keyPrefix: TKPrefix;
}

interface ViewContext<TKPrefix extends KeyPrefix<DefaultNamespace>> {
  $implicit: TFunction<DefaultNamespace, TKPrefix>;
}

/* TODO: docs */
/* TODO: test */

@Directive({
  selector: '[natuTranslation]',
  standalone: true,
})
export class NatuTranslationDirective<TKPrefix extends KeyPrefix<DefaultNamespace> = undefined> {
  static ngTemplateContextGuard<TKPrefix extends KeyPrefix<DefaultNamespace> = undefined>(
    _directive: NatuTranslationDirective<TKPrefix>,
    _context: unknown,
  ): _context is ViewContext<TKPrefix> {
    return true;
  }

  readonly options = input<Partial<Options<TKPrefix>>>({}, { alias: 'natuTranslation' });

  private readonly templateRef = inject<TemplateRef<ViewContext<TKPrefix>>>(TemplateRef);
  private readonly viewContainerRef = inject(ViewContainerRef);
  private readonly translationFunction = injectTranslationFunction<TKPrefix>();

  constructor() {
    effect((onCleanup) => {
      const translationFunction = this.translationFunction();

      if (translationFunction) {
        const viewRef = untracked(() =>
          this.viewContainerRef.createEmbeddedView<ViewContext<TKPrefix>>(this.templateRef, {
            $implicit: translationFunction,
          }),
        );

        onCleanup(() => {
          untracked(() => viewRef.destroy());
        });
      }
    });
  }
}
