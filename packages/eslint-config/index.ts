// @ts-check

import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import functional from 'eslint-plugin-functional/flat';
import sonarjs from 'eslint-plugin-sonarjs';

// TODO: strict and stylistic type checked https://typescript-eslint.io/getting-started/typed-linting/

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.strictTypeChecked,
  ...tseslint.configs.stylisticTypeChecked,
  functional.configs.recommended,
  functional.configs.stylistic,
  functional.configs.externalTypescriptRecommended,
  sonarjs.configs.recommended,
);
