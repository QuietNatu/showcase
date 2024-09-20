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
// import angular from 'angular-eslint';

/* TODO: replace main with exports in package.json */
/* TODO: add "type": "module" to all missing package json */
/* TODO: missing packages
  eslint-plugin-sonarjs
  eslint-plugin-storybook
*/
/* TODO: explore extra packages
  eslint-plugin-import / eslint-plugin-import-x
  eslint-plugin-jsdoc
*/

const compat = new FlatCompat();

const baseConfig = tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.strictTypeChecked,
  ...tseslint.configs.stylisticTypeChecked,
  ...compat.extends('turbo'),
  functional.configs.recommended,
  functional.configs.stylistic,
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

const vrtConfig = tseslint.config({
  ...playwright.configs['flat/recommended'],
  files: ['vrt/**/*', 'src/**/*.vrt.ts'],
  rules: {
    'playwright/expect-expect': 'off',
    'playwright/valid-title': 'off',
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
      'vitest/prefer-expect-resolves': 'off',
      'vitest/prefer-expect-assertions': 'off',
      'vitest/prefer-to-be-falsy': 'off',
      'vitest/prefer-to-be-truthy': 'off',
      'vitest/require-top-level-describe': 'off',
      'vitest/max-expects': 'off',
      'vitest/no-hooks': [
        'error',
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
    files: ['src/**/*.test.[jt]s?(x)', 'src/**/test/**/*.[jt]s?(x)'],
    plugins: {
      'testing-library': fixupPluginRules({
        rules: testingLibrary.rules,
      }),
    },
    rules: {
      ...testingLibrary.configs['flat/react'].rules,
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
    },
  },
);

// blocked until this is solved -> https://github.com/angular-eslint/angular-eslint/issues/1859
// const angularConfig = tseslint.config(
//   ...baseConfig,
//   {
//     files: ['**/*.ts'],
//     extends: [...angular.configs.tsRecommended],
//     processor: angular.processInlineTemplates,
//     rules: {
//       '@angular-eslint/directive-selector': [
//         'error',
//         {
//           type: 'attribute',
//           prefix: 'app',
//           style: 'camelCase',
//         },
//       ],
//       '@angular-eslint/component-selector': [
//         'error',
//         {
//           type: ['attribute', 'element'],
//           prefix: 'app',
//           style: 'kebab-case',
//         },
//       ],
//       '@angular-eslint/prefer-on-push-component-change-detection': 'error',
//       '@angular-eslint/prefer-standalone': 'error',
//     },
//   },
//   {
//     files: ['**/*.html'],
//     extends: [...angular.configs.templateRecommended, ...angular.configs.templateAccessibility],
//     rules: {},
//   },
// );

export default {
  configs: {
    base: baseConfig,
    e2e: e2eConfig,
    vrt: vrtConfig,
    vitest: vitestConfig,
    react: reactConfig,
    // angular: angularConfig,
  },
};
