/**
 * Picks a fallback language to use when the current language is not supported.
 *
 * @param language - language that is not supported
 * @param fallbackLanguages - possible fallback languages
 * @param finalLanguage - for when no fallback language was found
 * @returns the fallback language
 */
export function getFallbackLanguage(
  language: string | undefined,
  fallbackLanguages: string[],
  finalLanguage: string,
): string {
  if (!language) {
    return finalLanguage;
  }

  const languageCode = removeLocaleFromLanguage(language);

  const foundLanguage = fallbackLanguages.find(
    (fallbackLanguage) => languageCode === removeLocaleFromLanguage(fallbackLanguage),
  );

  return foundLanguage ?? finalLanguage;
}

function removeLocaleFromLanguage(language: string) {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  return language.split('-')[0]!;
}
