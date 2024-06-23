/* TODO: test */
/* TODO: docs */

export function getFallbackLanguage(
  language: string,
  fallbackLanguages: string[],
): string | undefined {
  const languageCode = removeLocaleFromLanguage(language);

  return fallbackLanguages.find(
    (fallbackLanguage) => languageCode === removeLocaleFromLanguage(fallbackLanguage),
  );
}

function removeLocaleFromLanguage(language: string) {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  return language.split('-')[0]!;
}
