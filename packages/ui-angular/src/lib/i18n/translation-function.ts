import { assertInInjectionContext, inject, isSignal, Signal } from '@angular/core';
import { DefaultNamespace, KeyPrefix, TFunction } from 'i18next';
import { NatuTranslationService } from './translation.service';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { filter, map, merge, of, withLatestFrom } from 'rxjs';

interface Options<TKPrefix extends KeyPrefix<DefaultNamespace>> {
  keyPrefix: TKPrefix;
}

//** TODO: DOCS explain this is needed because it depends on the current instance */
export function injectTranslationFunction<TKPrefix extends KeyPrefix<DefaultNamespace> = undefined>(
  options: Partial<Options<TKPrefix>> | Signal<Partial<Options<TKPrefix>>> = {},
): Signal<TFunction> {
  assertInInjectionContext(injectTranslationFunction);

  const translationService = inject(NatuTranslationService);

  const options$ = isSignal(options) ? toObservable(options) : of(options);

  const t$ = merge(
    options$,
    // this.translationService.events.initialized$, // TODO: this or like how react does it? Is it even needed? Wont language changed also be triggered?
    translationService.languageChanged$,
  ).pipe(
    filter(() => checkIsReady(translationService)),
    withLatestFrom(options$),
    map(([, options]) => translationService.i18n.getFixedT(null, null, options.keyPrefix)),
  );

  return toSignal(t$, {
    initialValue: defaultTFunction as TFunction<DefaultNamespace, TKPrefix>,
  });
}

function checkIsReady(translationService: NatuTranslationService) {
  return translationService.i18n.isInitialized || translationService.i18n.initializedStoreOnce;
}

function defaultTFunction(
  key: string | string[],
  optionsOrDefaultValue: string | { defaultValue: string },
): string {
  if (typeof optionsOrDefaultValue === 'string') {
    return optionsOrDefaultValue;
  } else if (typeof optionsOrDefaultValue?.defaultValue === 'string') {
    return optionsOrDefaultValue.defaultValue;
  } else {
    return Array.isArray(key) ? key.join('.') : key;
  }
}
