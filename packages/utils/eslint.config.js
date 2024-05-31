// @ts-check

import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import functional from 'eslint-plugin-functional/flat';
import sonarjs from 'eslint-plugin-sonarjs';
import unusedImports from 'eslint-plugin-unused-imports';

/* TODO: unusedImports not working because of typescript eslint (prob because of alpha version). https://github.com/sweepline/eslint-plugin-unused-imports/issues/77 */

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.strictTypeChecked,
  ...tseslint.configs.stylisticTypeChecked,
  functional.configs.recommended,
  functional.configs.stylistic,
  functional.configs.externalTypescriptRecommended,
  sonarjs.configs.recommended,
  {
    plugins: { 'unused-imports': unusedImports },
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
      'unused-imports/no-unused-imports': 'error',
    },
  },
  {
    languageOptions: {
      parserOptions: {
        project: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
);
