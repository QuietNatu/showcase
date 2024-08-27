import { TestBed } from '@angular/core/testing';
import { NatuTranslationService } from './translation.service';
import i18next from 'i18next';
import { NATU_I18N_INSTANCE } from './translation-tokens';
import { firstValueFrom } from 'rxjs';

describe(NatuTranslationService.name, () => {
  it('uses default i18next instance if none is provided', () => {
    const translationService = TestBed.inject(NatuTranslationService);

    expect(translationService.i18n).toBe(i18next);
  });

  it('uses provided i18next instance', async () => {
    const { translationService, i18nInstance } = await setup();

    expect(translationService.i18n).toBe(i18nInstance);
  });

  it('notifies when language is changed', async () => {
    const { translationService, i18nInstance } = await setup();

    const ptPromise = firstValueFrom(translationService.languageChanged$);

    await i18nInstance.changeLanguage('pt-PT');

    const enPromise = firstValueFrom(translationService.languageChanged$);

    await i18nInstance.changeLanguage('en-GB');

    expect(await ptPromise).toBe('pt-PT');
    expect(await enPromise).toBe('en-GB');
  });
});

async function setup() {
  const i18nInstance = i18next.createInstance();

  await i18nInstance.init({
    debug: false,
    lng: 'en-GB',
    supportedLngs: ['en-GB', 'pt-PT'],

    resources: {
      'en-GB': {
        translation: {
          example: 'translated example',
        },
      },
      'pt-PT': {
        translation: {
          example: 'exemplo traduzido',
        },
      },
    },

    interpolation: {
      escapeValue: false,
    },
  });

  TestBed.configureTestingModule({
    providers: [{ provide: NATU_I18N_INSTANCE, useValue: i18nInstance }],
  });

  const translationService = TestBed.inject(NatuTranslationService);

  return { translationService, i18nInstance };
}
