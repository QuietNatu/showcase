import { DestroyRef, inject, Injectable } from '@angular/core';
import i18next from 'i18next';
import { Observable, Subject } from 'rxjs';
import { NATU_I18N_INSTANCE } from './translation-tokens';

/**
 * TODO: Add note that this should not be used directly because t function wont be correct
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
    const languageChanged = (language: string) => this.languageChangedSubject$.next(language);

    this.i18n.on('languageChanged', languageChanged);

    this.destroyRef.onDestroy(() => {
      this.i18n.off('languageChanged', languageChanged);
    });
  }
}
