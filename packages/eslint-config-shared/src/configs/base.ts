import { Config, defineConfig, globalIgnores } from 'eslint/config';
import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import turboConfig from 'eslint-config-turbo/flat';
import functional from 'eslint-plugin-functional';
import unusedImports from 'eslint-plugin-unused-imports';
import { jsdoc } from 'eslint-plugin-jsdoc';
import unicorn from 'eslint-plugin-unicorn';
import comments from '@eslint-community/eslint-plugin-eslint-comments/configs';
import security from 'eslint-plugin-security';
import promise from 'eslint-plugin-promise';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import packageJson from 'eslint-plugin-package-json';

export const baseConfig = defineConfig(
  globalIgnores([
    'node_modules/',
    'dist/',
    'coverage/',
    'public/',
    'src/**/gen/',
    '!.storybook',
    '.storybook/main.ts',
    'storybook-static/',
    '.lighthouseci/',
    'lighthouse-reports/',
    'tests/*/report',
    'commitlint.config.js',
    'lint-staged.config.js',
    'prettier.config.js',
    'stylelint.config.js',
    'postcss.config.js',
    'tsup.config.ts',
    'orval.config.ts',
    'lighthouserc.*js',
    '**/*.gen.ts',
  ]),
  {
    files: ['package.json'],
    extends: [packageJson.configs.recommended, packageJson.configs.stylistic],
    settings: {
      packageJson: {
        enforceForPrivate: false,
      },
    },
  },
  {
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
      security.configs.recommended as Config,
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

      'unicorn/prefer-early-return': ['error', { maximumStatements: 3 }],
      'unicorn/prefer-top-level-await': 'off',
      'unicorn/no-useless-undefined': 'off',

      'unused-imports/no-unused-imports': 'error',
    },
    languageOptions: {
      globals: globals.browser,
    },
  },
);
