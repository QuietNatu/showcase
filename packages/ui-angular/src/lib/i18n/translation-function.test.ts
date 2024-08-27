import i18next from 'i18next';
import { injectTranslationFunction } from './translation-function';
import { TestBed } from '@angular/core/testing';
import { NATU_I18N_INSTANCE } from './translation-tokens';
import { NatuTranslationService } from './translation.service';
import { PartialDeep } from 'type-fest';
import { firstValueFrom, Subject } from 'rxjs';
import { signal } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';

describe(injectTranslationFunction.name, () => {
  it('fails if function is not used within an injection context', () => {
    expect(injectTranslationFunction).toThrow();
  });

  it('provides default translate function when translations are still not ready', () => {
    const translationServiceMock: PartialDeep<NatuTranslationService> = {
      languageChanged$: new Subject<string>(),
      i18n: {
        isInitialized: false,
        initializedStoreOnce: false,
      },
    };

    TestBed.configureTestingModule({
      providers: [{ provide: NatuTranslationService, useValue: translationServiceMock }],
    });

    const t = TestBed.runInInjectionContext(() => injectTranslationFunction()());

    expect(t('example', 'default value')).toBe('default value');
    expect(t('example', { defaultValue: 'default value' })).toBe('default value');
    expect(t('example' as any)).toBe('example'); // eslint-disable-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-argument
    expect(t(['example', 'nested'] as any)).toBe('example.nested'); // eslint-disable-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-argument
  });

  it('provides fixed translate function', async () => {
    const i18nInstance = await createI18nInstance();

    TestBed.configureTestingModule({
      providers: [{ provide: NATU_I18N_INSTANCE, useValue: i18nInstance }],
    });

    const t1 = TestBed.runInInjectionContext(() => injectTranslationFunction()());
    const t2 = TestBed.runInInjectionContext(
      () => injectTranslationFunction({ keyPrefix: 'group' as any })(), // eslint-disable-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-assignment
    );
    const t3 = await TestBed.runInInjectionContext(() => {
      const t = injectTranslationFunction(signal({ keyPrefix: 'group' as any })); // eslint-disable-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-assignment
      return firstValueFrom(toObservable(t));
    });

    expect(t1('group.example' as any)).toBe('translated example'); // eslint-disable-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-explicit-any
    expect(t1('example' as any)).not.toBe('translated example'); // eslint-disable-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-explicit-any

    expect(t2('group.example' as any)).not.toBe('translated example'); // eslint-disable-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-explicit-any
    expect(t2('example' as any)).toBe('translated example'); // eslint-disable-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-explicit-any

    expect(t3('group.example' as any)).not.toBe('translated example'); // eslint-disable-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-explicit-any
    expect(t3('example' as any)).toBe('translated example'); // eslint-disable-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-explicit-any
  });
});

async function createI18nInstance() {
  const i18nInstance = i18next.createInstance();

  await i18nInstance.init({
    debug: false,
    lng: 'en-GB',
    supportedLngs: ['en-GB'],

    resources: {
      'en-GB': {
        translation: {
          group: {
            example: 'translated example',
          },
        },
      },
    },

    interpolation: {
      escapeValue: false,
    },
  });

  return i18nInstance;
}
