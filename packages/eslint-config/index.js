import globals from 'globals';
import eslint from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';
import { fixupPluginRules } from '@eslint/compat';
import tseslint from 'typescript-eslint';
import functional from 'eslint-plugin-functional';
import unusedImports from 'eslint-plugin-unused-imports';
import playwright from 'eslint-plugin-playwright';
import vitest from '@vitest/eslint-plugin';
import jestDom from 'eslint-plugin-jest-dom';
import testingLibrary from 'eslint-plugin-testing-library';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import sonarjs from 'eslint-plugin-sonarjs';
import jsdoc from 'eslint-plugin-jsdoc';
import jasmine from 'eslint-plugin-jasmine';
import angular from 'angular-eslint';

/* TODO: missing packages
  eslint-plugin-storybook
*/
/* TODO: explore extra packages
  eslint-plugin-import
*/

const compat = new FlatCompat();

const baseConfig = tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.strictTypeChecked,
  ...tseslint.configs.stylisticTypeChecked,
  ...compat.extends('turbo'),
  functional.configs.recommended,
  functional.configs.stylistic,
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
      'functional/functional-parameters': [
        'error',
        { allowRestParameter: true, enforceParameterCount: false },
      ],
      'functional/no-expression-statements': 'off',
      'functional/no-conditional-statements': 'off',
      'functional/no-return-void': 'off',
      'functional/no-mixed-types': 'off',
      'functional/prefer-immutable-types': 'off',
      'functional/prefer-tacit': 'off',
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
  files: ['e2e/**/*.[jt]s?(x)'],
});

const vrtConfig = tseslint.config({
  ...playwright.configs['flat/recommended'],
  files: ['vrt/**/*.[jt]s?(x)', 'src/**/*.vrt.ts'],
  rules: {
    'playwright/expect-expect': 'off',
    'playwright/valid-title': 'off',
  },
});

const storybookConfig = tseslint.config({
  files: ['src/**/*.stories.[jt]s?(x)'],
  rules: {
    '@typescript-eslint/restrict-template-expressions': 'off',
  },
});

const vitestConfig = tseslint.config(
  {
    files: ['src/**/*.test.[jt]s?(x)', 'src/**/test/**/*.[jt]s?(x)'],
    plugins: {
      vitest,
    },
    rules: {
      ...vitest.configs.recommended.rules,
      ...vitest.configs.all.rules,
      'vitest/consistent-test-it': ['warn', { fn: 'test', withinDescribe: 'test' }],
      'vitest/prefer-expect-resolves': 'off',
      'vitest/prefer-expect-assertions': 'off',
      'vitest/prefer-to-be-falsy': 'off',
      'vitest/prefer-to-be-truthy': 'off',
      'vitest/require-top-level-describe': 'off',
      'vitest/max-expects': 'off',
      'vitest/no-hooks': [
        'warn',
        {
          allow: ['afterEach', 'afterAll'],
        },
      ],
    },
  },
  {
    ...jestDom.configs['flat/recommended'],
    files: ['src/**/*.test.[jt]s?(x)', 'src/**/test/**/*.[jt]s?(x)'],
  },
  {
    ...testingLibrary.configs['flat/react'],
    files: ['src/**/*.test.[jt]s?(x)', 'src/**/test/**/*.[jt]s?(x)'],
  },
  {
    files: ['src/**/*.test.[jt]s?(x)', 'src/**/test/**/*.[jt]s?(x)'],
    rules: {
      '@typescript-eslint/restrict-template-expressions': 'off',
      'sonarjs/no-identical-functions': 'off',
    },
  },
);

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
    ...testingLibrary.configs['flat/angular'],
    files: ['src/**/*.test.ts', 'src/**/test/**/*.ts'],
  },
  {
    files: ['src/**/*.test.ts', 'src/**/test/**/*.ts'],
    rules: {
      '@typescript-eslint/restrict-template-expressions': 'off',
      'sonarjs/no-identical-functions': 'off',
    },
  },
);

const reactConfig = tseslint.config(
  ...baseConfig,
  {
    ...react.configs.flat.recommended,
    ...react.configs.flat['jsx-runtime'],
    languageOptions: {
      ...react.configs.flat.recommended.languageOptions,
    },
    files: ['**/*.[jt]s?(x)'],
  },
  {
    files: ['**/*.[jt]s?(x)'],
    languageOptions: {
      globals: {
        ...globals.serviceworker,
        ...globals.browser,
      },
    },
  },
  {
    files: ['**/*.[jt]s?(x)'],
    plugins: {
      'react-hooks': fixupPluginRules(reactHooks),
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
    },
  },
  {
    files: ['**/*.[jt]s?(x)'],
    ignores: ['**/*.test.[jt]s?(x)', '**/test/**/*.[jt]s?(x)'],
    plugins: {
      'react-refresh': reactRefresh,
    },
    rules: {
      'react-refresh/only-export-components': ['error', { allowConstantExport: true }],
    },
  },
  {
    ...jsxA11y.flatConfigs.recommended,
    files: ['**/*.[jt]s?(x)'],
  },
  {
    files: ['**/*.[jt]s?(x)'],
    rules: {
      '@typescript-eslint/no-restricted-imports': [
        'error',
        {
          paths: [
            {
              name: '@testing-library/react',
              importNames: ['render', 'renderHook'],
              message: 'use our test helpers.',
            },
            {
              name: '@testing-library/user-event',
              message: 'use our test helpers.',
            },
            {
              name: 'react',
              importNames: ['createContext'],
              message: 'use our createContext function.',
            },
            {
              name: 'react-dom/test-utils',
              message: 'use testing library instead.',
            },
            {
              name: 'vitest-axe',
              importNames: ['axe'],
              message: 'use our axe wrapper.',
            },
            {
              name: 'date-fns',
              importNames: ['format', 'parse'],
              message: 'use our i18n library.',
            },
          ],
        },
      ],
      'react/button-has-type': [
        'error',
        {
          button: true,
          submit: true,
          reset: false,
        },
      ],
      'react/prefer-read-only-props': 'error',
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
      'functional/no-classes': 'off',
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

export default {
  configs: {
    base: baseConfig,
    e2e: e2eConfig,
    vrt: vrtConfig,
    storybook: storybookConfig,
    vitest: vitestConfig,
    jasmine: jasmineConfig,
    react: reactConfig,
    angular: angularConfig,
  },
  defaultIgnores,
};
