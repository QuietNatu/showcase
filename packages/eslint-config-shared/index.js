import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import turboConfig from 'eslint-config-turbo/flat';
import functional from 'eslint-plugin-functional';
import unusedImports from 'eslint-plugin-unused-imports';
import jsdoc from 'eslint-plugin-jsdoc';
import sonarjs from 'eslint-plugin-sonarjs';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import angular from 'angular-eslint';

/*
  TODO: use import { defineConfig } from 'eslint/config'; once tslint is ready for it
        check how eslint configures projects now https://eslint.org/docs/latest/use/getting-started
        and then check if typescript-eslint can be removed from peer-dependencies
*/

// TODO: recheck rules and libraries

const defaultIgnores = [
  'node_modules/',
  'dist/',
  'coverage/',
  'public/',
  '.storybook/main.ts',
  'storybook-static/',
  '.lighthouseci/',
  'lighthouse-reports/',
  'e2e/.features-gen/',
  'vite.config.ts',
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
];

const baseConfig = tseslint.config(
  js.configs.recommended,
  {
    files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
    languageOptions: { globals: globals.browser },
  },
  ...tseslint.configs.strictTypeChecked,
  ...tseslint.configs.stylisticTypeChecked,
  ...turboConfig,
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
      '@typescript-eslint/no-floating-promises': ['error', { ignoreVoid: true }],
      '@typescript-eslint/no-non-null-assertion': 'warn',
      '@typescript-eslint/no-unsafe-member-access': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/prefer-readonly': 'error',
      '@typescript-eslint/restrict-template-expressions': ['error', { allowNumber: true }],
      '@typescript-eslint/switch-exhaustiveness-check': 'error',
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
      'sonarjs/prefer-read-only-props': 'off',
      'sonarjs/no-nested-functions': 'off',
      'sonarjs/no-selector-parameter': 'off',
      'sonarjs/no-unused-vars': 'off',
      'sonarjs/redundant-type-aliases': 'off',
      'sonarjs/todo-tag': 'off',
      'unused-imports/no-unused-imports': 'error',
    },
  },
);

const angularConfig = tseslint.config(
  {
    files: ['**/*.ts'],
    extends: [...baseConfig, ...angular.configs.tsRecommended],
    processor: angular.processInlineTemplates,
    rules: {
      '@angular-eslint/component-class-suffix': 'off',
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
          type: 'element',
          prefix: 'app',
          style: 'kebab-case',
        },
      ],
      '@angular-eslint/prefer-on-push-component-change-detection': 'error',
      '@angular-eslint/prefer-standalone': 'error',
      '@typescript-eslint/no-extraneous-class': 'off',
      'functional/no-classes': 'off',
    },
  },
  {
    files: ['**/*.html'],
    extends: [...angular.configs.templateRecommended, ...angular.configs.templateAccessibility],
    rules: {},
  },
);

const reactConfig = tseslint.config(
  ...baseConfig,
  // @ts-ignore
  react.configs.flat.recommended,
  react.configs.flat['jsx-runtime'],
  reactHooks.configs['recommended-latest'],
  reactRefresh.configs.vite,
  jsxA11y.flatConfigs.recommended,
  {
    rules: {
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

export default {
  configs: {
    angular: angularConfig,
    base: baseConfig,
    react: reactConfig,
  },
  defaultIgnores,
};
