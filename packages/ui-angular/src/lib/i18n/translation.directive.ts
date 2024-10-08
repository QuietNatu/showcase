import {
  ChangeDetectorRef,
  computed,
  Directive,
  effect,
  inject,
  input,
  TemplateRef,
  untracked,
  ViewContainerRef,
} from '@angular/core';
import { DefaultNamespace, KeyPrefix, TFunction } from 'i18next';
import { injectTranslation } from './inject-translation';

interface ViewContext<TKPrefix extends KeyPrefix<DefaultNamespace>> {
  $implicit: TFunction<DefaultNamespace, TKPrefix>;
}

/**
 * Structural directive that provides the translation function to a template.
 */
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

  readonly keyPrefix = input<TKPrefix | undefined>(undefined, {
    alias: 'natuTranslationKeyPrefix',
  });

  private readonly templateRef = inject<TemplateRef<ViewContext<TKPrefix>>>(TemplateRef);
  private readonly viewContainerRef = inject(ViewContainerRef);
  private readonly changeDetectorRef = inject(ChangeDetectorRef);
  private readonly translationInstance = this.getTranslationInstance();

  constructor() {
    effect((onCleanup) => {
      const { t } = this.translationInstance();

      const viewRef = untracked(() =>
        this.viewContainerRef.createEmbeddedView<ViewContext<TKPrefix>>(this.templateRef, {
          $implicit: t,
        }),
      );

      this.changeDetectorRef.detectChanges();

      onCleanup(() => {
        untracked(() => {
          viewRef.destroy();
        });

        this.changeDetectorRef.detectChanges();
      });
    });
  }

  private getTranslationInstance() {
    const options = computed(() => ({ keyPrefix: this.keyPrefix() }));

    return injectTranslation(options);
  }
}
