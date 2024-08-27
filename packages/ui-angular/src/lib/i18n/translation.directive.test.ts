import i18next from 'i18next';
import { NatuTranslationDirective } from './translation.directive';
import { NATU_I18N_INSTANCE } from './translation-tokens';
import { render } from '../test';
import { screen } from '@testing-library/angular';

describe(NatuTranslationDirective.name, () => {
  it('provides translation function', async () => {
    const i18nInstance = await createI18nInstance();

    await render(`<div *natuTranslation="let t">{{ t('group.example') }}</div>`, {
      renderOptions: {
        imports: [NatuTranslationDirective],
        providers: [{ provide: NATU_I18N_INSTANCE, useValue: i18nInstance }],
      },
    });

    expect(screen.getByText('translated example')).toBeInTheDocument();
  });

  it('provides translation function with key prefix', async () => {
    const i18nInstance = await createI18nInstance();

    await render(`<div *natuTranslation="{ keyPrefix: 'group' }; let t">{{ t('example') }}</div>`, {
      renderOptions: {
        imports: [NatuTranslationDirective],
        providers: [{ provide: NATU_I18N_INSTANCE, useValue: i18nInstance }],
      },
    });

    expect(screen.getByText('translated example')).toBeInTheDocument();
  });
});

async function createI18nInstance() {
  const i18nInstance = i18next.createInstance();

  await i18nInstance.init({
    debug: false,
    lng: 'en-GB',
    supportedLngs: ['en-GB', 'pt-PT'],

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
