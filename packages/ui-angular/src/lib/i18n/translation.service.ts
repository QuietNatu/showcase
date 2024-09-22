import { DestroyRef, inject, Injectable } from '@angular/core';
import i18next from 'i18next';
import { Observable, Subject } from 'rxjs';
import { NATU_I18N_INSTANCE } from './translation-tokens';

/**
 * Provides i18n instance as well as utils to more easily interact with it.
 *
 * Should not be used to directly perform translations as they will not be reactive.
 */
@Injectable({ providedIn: 'root' })
export class NatuTranslationService {
  readonly i18n = inject(NATU_I18N_INSTANCE, { optional: true }) ?? i18next;

  readonly languageChanged$: Observable<string>;

  private readonly languageChangedSubject$ = new Subject<string>();

  private readonly destroyRef = inject(DestroyRef);

  constructor() {
    this.languageChanged$ = this.languageChangedSubject$.asObservable();

    this.registerEvents();
  }

  private registerEvents() {
    const languageChanged = (language: string) => {
      this.languageChangedSubject$.next(language);
    };

    this.i18n.on('languageChanged', languageChanged);

    this.destroyRef.onDestroy(() => {
      this.i18n.off('languageChanged', languageChanged);
    });
  }
}
