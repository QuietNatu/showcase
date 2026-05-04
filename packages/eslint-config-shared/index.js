import { defineConfig } from 'eslint/config';
import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import turboConfig from 'eslint-config-turbo/flat';
import functional from 'eslint-plugin-functional';
import unusedImports from 'eslint-plugin-unused-imports';
import { jsdoc } from 'eslint-plugin-jsdoc';
import sonarjs from 'eslint-plugin-sonarjs';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import angular from 'angular-eslint';
import storybook from 'eslint-plugin-storybook';
import vitest from '@vitest/eslint-plugin';
import jestDom from 'eslint-plugin-jest-dom';
import playwright from 'eslint-plugin-playwright';
import unicorn from 'eslint-plugin-unicorn';
import prettier from 'eslint-config-prettier/flat';
import comments from '@eslint-community/eslint-plugin-eslint-comments/configs';
import security from 'eslint-plugin-security';
import promise from 'eslint-plugin-promise';
import tanstackRouter from '@tanstack/eslint-plugin-router';
import simpleImportSort from 'eslint-plugin-simple-import-sort';

const defaultIgnores = [
  'node_modules/',
  'dist/',
  'coverage/',
  'public/',
  'src/**/gen/',
  '.angular/',
  '!.storybook',
  '.storybook/main.ts',
  'storybook-static/',
  '.lighthouseci/',
  'lighthouse-reports/',
  'tests/*/report',
  'eslint.config.js',
  'commitlint.config.js',
  'lint-staged.config.js',
  'prettier.config.js',
  'stylelint.config.js',
  'postcss.config.js',
  'tsup.config.ts',
  'orval.config.ts',
  'lighthouserc.*js',
  '**/*.gen.ts',
];

const baseConfig = defineConfig({
  files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
  extends: [
    js.configs.recommended,
    tseslint.configs.strictTypeChecked,
    tseslint.configs.stylisticTypeChecked,
    turboConfig,
    functional.configs.recommended,
    functional.configs.stylistic,
    jsdoc({ config: 'flat/recommended-typescript' }),
    comments.recommended,
    promise.configs['flat/recommended'],
    /** @type {import('eslint/config').Config} */ (security.configs.recommended),
    // @ts-ignore
    sonarjs.configs.recommended,
    unicorn.configs.unopinionated,
  ],
  plugins: {
    'simple-import-sort': simpleImportSort,
    'unused-imports': unusedImports,
  },
  rules: {
    'no-console': 'warn',
    '@eslint-community/eslint-comments/require-description': [
      'error',
      { ignore: ['eslint-enable'] },
    ],
    '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
    '@typescript-eslint/consistent-type-imports': 'error',
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
    'simple-import-sort/imports': [
      'error',
      {
        groups: [
          // Side effect imports
          ['^\\u0000'],
          // Node.js builtins prefixed with `node:`
          ['^node:'],
          // Packages
          // Internal monorepo packages
          ['^@natu/'],
          // Things that start with a letter (or digit or underscore), or `@` followed by a letter
          ['^@?\\w'],
          // Absolute imports and other imports such as Vue-style `@/foo`
          // Anything not matched in another group
          ['^'],
          // Relative imports
          // Anything that starts with a dot
          ['^\\.'],
        ],
      },
    ],
    'simple-import-sort/exports': 'error',
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
    'unicorn/prefer-top-level-await': 'off',
    'unicorn/no-useless-undefined': 'off',
    'unused-imports/no-unused-imports': 'error',
  },
  languageOptions: {
    globals: globals.browser,
    parserOptions: {
      projectService: true,
    },
  },
});

const angularConfig = defineConfig(
  {
    files: ['**/*.ts'],
    extends: [angular.configs.tsRecommended],
    processor: angular.processInlineTemplates,
    rules: {
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
      '@angular-eslint/prefer-signals': 'error',
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

const reactConfig = defineConfig({
  files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
  extends: [
    /** @type {import('eslint/config').Config} */ (react.configs.flat.recommended),
    /** @type {import('eslint/config').Config} */ (react.configs.flat['jsx-runtime']),
    reactHooks.configs.flat.recommended,
    reactRefresh.configs.vite,
    jsxA11y.flatConfigs.recommended,
    tanstackRouter.configs['flat/recommended'],
  ],
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
});

const storybookConfig = defineConfig(
  {
    files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
    extends: [
      /** @type {import('eslint/config').Config[]} */ (storybook.configs['flat/recommended']),
    ],
  },
  {
    files: ['src/**/*.stories.[jt]s?(x)'],
    rules: {
      '@typescript-eslint/restrict-template-expressions': 'off',
      'security/detect-object-injection': 'off',
    },
  },
);

const vitestConfig = defineConfig({
  files: ['src/**/*.test.[jt]s?(x)', 'src/**/test/**/*.[jt]s?(x)'],
  extends: [jestDom.configs['flat/recommended']],
  plugins: {
    vitest,
  },
  rules: {
    ...vitest.configs.all.rules,
    '@typescript-eslint/only-throw-error': 'off',
    '@typescript-eslint/restrict-template-expressions': 'off',
    'functional/no-throw-statements': 'off',
    'security/detect-object-injection': 'off',
    'vitest/consistent-test-it': ['warn', { fn: 'test', withinDescribe: 'test' }],
    'vitest/prefer-expect-resolves': 'off',
    'vitest/prefer-expect-assertions': 'off',
    'vitest/prefer-importing-vitest-globals': 'off',
    'vitest/prefer-to-be-falsy': 'off',
    'vitest/prefer-to-be-truthy': 'off',
    'vitest/require-top-level-describe': 'off',
    'vitest/max-expects': 'off',
    'vitest/no-focused-tests': ['error', { fixable: false }],
    'vitest/no-hooks': 'off',
  },
});

const playwrightConfig = defineConfig({
  files: ['tests/**/*.ts'],
  extends: [playwright.configs['flat/recommended']],
  rules: {
    '@typescript-eslint/only-throw-error': 'off',
    'functional/no-throw-statements': 'off',
  },
});

const vrtConfig = defineConfig({
  files: ['vrt/**/*.ts', 'src/**/*.vrt.ts'],
  extends: [playwright.configs['flat/recommended']],
  rules: {
    'playwright/expect-expect': 'off',
    'playwright/valid-title': 'off',
    'security/detect-object-injection': 'off',
  },
});

const prettierConfig = defineConfig(prettier);

export default {
  configs: {
    angular: angularConfig,
    base: baseConfig,
    react: reactConfig,
    storybook: storybookConfig,
    vitest: vitestConfig,
    playwright: playwrightConfig,
    vrt: vrtConfig,
    /** Should be placed after all the other configs and rules */
    prettier: prettierConfig,
  },
  defaultIgnores,
};
