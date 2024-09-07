import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import functional from 'eslint-plugin-functional';
import { FlatCompat } from '@eslint/eslintrc';
import playwright from 'eslint-plugin-playwright';
import vitest from 'eslint-plugin-vitest';

/* TODO: replace main with exports in package.json */
/* TODO: add "type": "module" to all missing package json */
/* TODO: missing packages
  eslint-plugin-sonarjs
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
    rules: {
      'no-console': 'warn',
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
    },
  },
);

const e2eConfig = tseslint.config({
  ...playwright.configs['flat/recommended'],
  files: ['e2e'],
});

const vrtConfig = tseslint.config({
  ...playwright.configs['flat/recommended'],
  files: ['vrt/**/*', 'src/**/*.vrt.ts'],
});

const vitestConfig = tseslint.config({
  files: ['src/**/*.test.[jt]s?(x)'],
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
});

export default {
  config: {
    base: baseConfig,
    e2e: e2eConfig,
    vrt: vrtConfig,
    vitest: vitestConfig,
  },
};
