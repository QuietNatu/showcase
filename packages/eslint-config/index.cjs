const eslint = require('@eslint/js');
const { FlatCompat } = require('@eslint/eslintrc');
const { fixupPluginRules } = require('@eslint/compat');
const tseslint = require('typescript-eslint');
const unusedImports = require('eslint-plugin-unused-imports');
const playwright = require('eslint-plugin-playwright');
const jasmine = require('eslint-plugin-jasmine');
const testingLibrary = require('eslint-plugin-testing-library');
const angular = require('angular-eslint');
const sonarjs = require('eslint-plugin-sonarjs');
const jsdoc = require('eslint-plugin-jsdoc');

const compat = new FlatCompat();

const baseConfig = tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.strictTypeChecked,
  ...tseslint.configs.stylisticTypeChecked,
  ...compat.extends('turbo'),
  /* eslint-plugin-functional only supports esm */
  jsdoc.configs['flat/recommended-typescript'],
  sonarjs.configs.recommended,
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
      'jsdoc/require-jsdoc': [
        'error',
        {
          publicOnly: true,
          checkConstructors: false,
          require: {
            ArrowFunctionExpression: true,
            ClassDeclaration: true,
            ClassExpression: true,
            FunctionDeclaration: true,
            FunctionExpression: true,
            MethodDefinition: false,
          },
        },
      ],
      'jsdoc/require-param': 'off',
      'jsdoc/require-returns': 'off',
      'sonarjs/deprecation': 'off',
      'sonarjs/function-return-type': 'off',
      'sonarjs/prefer-function-type': 'off',
      'sonarjs/prefer-nullish-coalescing': 'off',
      'sonarjs/no-nested-functions': 'off',
      'sonarjs/no-selector-parameter': 'off',
      'sonarjs/redundant-type-aliases': 'off',
      'sonarjs/sonar-prefer-read-only-props': 'off',
      'sonarjs/todo-tag': 'off',
      'unused-imports/no-unused-imports': 'error',
    },
  },
);

const e2eConfig = tseslint.config({
  ...playwright.configs['flat/recommended'],
  files: ['e2e/**/*'],
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
      'sonarjs/no-identical-functions': 'off',
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

const defaultIgnores = [
  'node_modules/',
  'dist/',
  'coverage/',
  'public/',
  'storybook-static/',
  '.lighthouseci/',
  'lighthouse-reports/',
  'vite.config.ts*',
  'playwright.config.ts',
  'eslint.config.js',
  'commitlint.config.js',
  'lint-staged.config.js',
  'prettier.config.js',
  'stylelint.config.js',
  'postcss.config.js',
  'tsup.config.ts',
  'orval.config.ts',
  'lighthouserc.*js',
  '**/mockServiceWorker.js',
  '**/.storybook/main.ts',
];

module.exports = {
  configs: {
    base: baseConfig,
    e2e: e2eConfig,
    vrt: vrtConfig,
    storybook: storybookConfig,
    jasmine: jasmineConfig,
    angular: angularConfig,
  },
  defaultIgnores,
};
