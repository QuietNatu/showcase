import { getFallbackLanguage } from './locale';

test('gets fallback language', () => {
  const result1 = getFallbackLanguage('en', ['pt-PT', 'en-GB'], 'pt-pT');
  const result2 = getFallbackLanguage('en-US', ['pt-PT', 'en-GB'], 'pt-pT');
  const result3 = getFallbackLanguage('de-DE', ['pt-PT', 'en-GB'], 'en-GB');
  const result4 = getFallbackLanguage(undefined, ['pt-PT', 'en-GB'], 'en-GB');

  expect(result1).toBe('en-GB');
  expect(result2).toBe('en-GB');
  expect(result3).toBe('en-GB');
  expect(result4).toBe('en-GB');
});
