import {
  assertInInjectionContext,
  computed,
  inject,
  isSignal,
  signal,
  Signal,
} from '@angular/core';
import { DefaultNamespace, KeyPrefix, TFunction } from 'i18next';
import { NatuTranslationService } from './translation.service';
import { toSignal } from '@angular/core/rxjs-interop';

export interface InjectTranslationOptions<TKPrefix extends KeyPrefix<DefaultNamespace>> {
  keyPrefix?: TKPrefix;
}

export interface InjectTranslationResult {
  t: TFunction;
}

/**
 * Provides a reactive translation function with applied defaults.
 *
 * @param options - options that will modify the translation function instance
 * @param options.keyPrefix - prefix that will be applied to all translations
 * @returns the translation function
 */
export function injectTranslation<TKPrefix extends KeyPrefix<DefaultNamespace> = undefined>(
  options: InjectTranslationOptions<TKPrefix> | Signal<InjectTranslationOptions<TKPrefix>> = {},
): Signal<InjectTranslationResult> {
  assertInInjectionContext(injectTranslation);

  const translationService = inject(NatuTranslationService);

  const options$ = isSignal(options) ? options : signal(options);
  const language$ = toSignal(translationService.languageChanged$, { initialValue: null });

  return computed(() => {
    const options = options$();
    const language = language$();

    return checkIsReady(translationService)
      ? { t: translationService.i18n.getFixedT(language, null, options.keyPrefix) }
      : { t: defaultTFunction as TFunction<DefaultNamespace, TKPrefix> };
  });
}

function checkIsReady(translationService: NatuTranslationService) {
  /* TODO: should this be used in APP_INITIALIZED is being used? */
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
