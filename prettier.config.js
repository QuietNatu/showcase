/**
 * @see https://prettier.io/docs/configuration
 * @type {import("prettier").Config}
 */
export default {
  singleQuote: true,
  semi: true,
  bracketSpacing: true,
  endOfLine: 'auto',
  overrides: [
    {
      files: ['apps/rotom/src/**/*.html', 'packages/ui-angular/src/**/*.html'],
      options: {
        parser: 'angular',
      },
    },
  ],
};
