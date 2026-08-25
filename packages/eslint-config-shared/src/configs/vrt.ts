import { defineConfig } from 'eslint/config';

import playwright from 'eslint-plugin-playwright';

export const vrtConfig = defineConfig({
  files: ['vrt/**/*.ts', 'src/**/*.vrt.ts'],
  extends: [playwright.configs['flat/recommended']],
  rules: {
    'functional/no-loop-statements': 'off',
    'playwright/expect-expect': 'off',
    'playwright/valid-title': 'off',
    'security/detect-object-injection': 'off',
  },
});
