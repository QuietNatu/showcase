const eslint = require('@eslint/js');
const { FlatCompat } = require('@eslint/eslintrc');
const { fixupPluginRules } = require('@eslint/compat');
const tseslint = require('typescript-eslint');
const unusedImports = require('eslint-plugin-unused-imports');
const playwright = require('eslint-plugin-playwright');
const jasmine = require('eslint-plugin-jasmine');
const testingLibrary = require('eslint-plugin-testing-library');
const angular = require('angular-eslint');

const compat = new FlatCompat();

const baseConfig = tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.strictTypeChecked,
  ...tseslint.configs.stylisticTypeChecked,
  ...compat.extends('turbo'),
  /* eslint-plugin-functional only supports esm */
  {
    plugins: {
      'unused-imports': unusedImports,
    },
  },
  {
    rules: {
      'no-console': 'warn',
      '@typescript-eslint/no-empty-function': 'off',
      '@typescript-eslint/no-floating-promises': ['error', { ignoreVoid: true }],
      '@typescript-eslint/no-non-null-assertion': 'warn',
      '@typescript-eslint/no-unsafe-member-access': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/restrict-template-expressions': ['error', { allowNumber: true }],
      'unused-imports/no-unused-imports': 'error',
    },
  },
  {
    /* TODO: adjust this */
    ignores: [
      'node_modules/',
      'dist/',
      'coverage/',
      'public/',
      'vite.config.ts',
      'playwright.config.ts',
      'eslint.config.js',
      'commitlint.config.js',
      'lint-staged.config.js',
      'prettier.config.js',
      'stylelint.config.js',
      'postcss.config.js',
    ],
  },
);

const e2eConfig = tseslint.config({
  ...playwright.configs['flat/recommended'],
  files: ['e2e'],
});

const vrtConfig = tseslint.config(
  {
    ...playwright.configs['flat/recommended'],
    files: ['vrt/**/*', 'src/**/*.vrt.ts'],
  },
  {
    files: ['vrt/**/*', 'src/**/*.vrt.ts'],
    rules: {
      'playwright/expect-expect': 'off',
      'playwright/valid-title': 'off',
    },
  },
);

const storybookConfig = tseslint.config({
  files: ['src/**/*.stories.[jt]s?(x)'],
  rules: {
    '@typescript-eslint/restrict-template-expressions': 'off',
  },
});

const jasmineConfig = tseslint.config(
  {
    files: ['src/**/*.test.ts', 'src/**/test/**/*.ts'],
    plugins: {
      jasmine: {
        rules: jasmine.rules,
      },
    },
    rules: {
      ...jasmine.configs.recommended.rules,
    },
  },
  {
    files: ['src/**/*.test.ts', 'src/**/test/**/*.ts'],
    plugins: {
      'testing-library': fixupPluginRules({
        rules: testingLibrary.rules,
      }),
    },
    rules: {
      ...testingLibrary.configs['flat/angular'].rules,
    },
  },
  {
    files: ['src/**/*.test.ts', 'src/**/test/**/*.ts'],
    rules: {
      '@typescript-eslint/restrict-template-expressions': 'off',
    },
  },
);

const angularConfig = tseslint.config(
  {
    files: ['**/*.ts'],
    extends: [...baseConfig, ...angular.configs.tsRecommended],
    processor: angular.processInlineTemplates,
    rules: {
      '@typescript-eslint/no-extraneous-class': 'off',
      '@typescript-eslint/no-restricted-imports': [
        'error',
        {
          paths: [
            {
              name: '@testing-library/angular',
              importNames: ['render'],
              message: 'use our test helpers.',
            },
            {
              name: '@testing-library/user-event',
              message: 'use our test helpers.',
            },
            {
              name: 'jasmine-axe',
              importNames: ['axe'],
              message: 'use our axe wrapper.',
            },
            {
              name: 'date-fns',
              importNames: ['format', 'parse'],
              message: 'use our i18n library.',
            },
          ],
          patterns: [
            {
              group: [
                '**/environments/*',
                '!**/environments/environment',
                '!**/environments/environment-types',
              ],
              message: 'import environments/environment',
            },
          ],
        },
      ],
      '@angular-eslint/directive-selector': [
        'error',
        {
          type: 'attribute',
          prefix: 'app',
          style: 'camelCase',
        },
      ],
      '@angular-eslint/component-selector': [
        'error',
        {
          type: ['attribute', 'element'],
          prefix: 'app',
          style: 'kebab-case',
        },
      ],
      '@angular-eslint/prefer-on-push-component-change-detection': 'error',
      '@angular-eslint/prefer-standalone': 'error',
    },
  },
  {
    files: ['**/*.html'],
    extends: [...angular.configs.templateRecommended, ...angular.configs.templateAccessibility],
    rules: {},
  },
);

module.exports = {
  configs: {
    base: baseConfig,
    e2e: e2eConfig,
    vrt: vrtConfig,
    storybook: storybookConfig,
    jasmine: jasmineConfig,
    angular: angularConfig,
  },
};
