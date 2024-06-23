import { getFallbackLanguage } from './locale';

test('gets fallback language', () => {
  const result1 = getFallbackLanguage('en', ['pt-PT', 'en-GB']);
  const result2 = getFallbackLanguage('en-US', ['pt-PT', 'en-GB']);
  const result3 = getFallbackLanguage('de-DE', ['pt-PT', 'en-GB']);
  const result4 = getFallbackLanguage('en', []);

  expect(result1).toBe('en-GB');
  expect(result2).toBe('en-GB');
  expect(result3).toBeUndefined();
  expect(result4).toBeUndefined();
});
