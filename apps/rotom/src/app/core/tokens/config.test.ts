import { TestBed } from '@angular/core/testing';
import { APP_CONFIG, AppConfig } from './config';

// TODO: remove this once runtime config implemented
const appConfig: AppConfig = {
  date: {
    weekStartsOn: 1,
    firstWeekContainsDate: 4,
  },
  i18n: {
    supportedLanguages: ['en-GB', 'en-US', 'pt-PT'],
    fallbackLanguages: ['en-GB', 'pt-PT'],
    finalFallbackLanguage: 'en-GB',
  },
};

describe('APP_CONFIG token', () => {
  it('provides config', () => {
    expect(TestBed.inject(APP_CONFIG)).toEqual(appConfig);
  });
});
