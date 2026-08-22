import { defineConfig } from 'eslint/config';

import playwright from 'eslint-plugin-playwright';

export const playwrightConfig = defineConfig({
  files: ['tests/**/*.ts'],
  extends: [playwright.configs['flat/recommended']],
  rules: {
    '@typescript-eslint/only-throw-error': 'off',
    'functional/no-throw-statements': 'off',
  },
});
