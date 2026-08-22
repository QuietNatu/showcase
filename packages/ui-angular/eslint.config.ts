import shared from '@natu/eslint-config-shared';

import { defineConfig } from 'eslint/config';

const restrictedImportsConfig = defineConfig({
  rules: {
    'no-restricted-imports': [
      'error',
      {
        patterns: [...shared.utils.buildRestrictedPatterns('@natu/ui-angular')],
      },
    ],
  },
});

const appConfig = defineConfig({
  files: ['**/*.ts'],
  rules: {
    '@angular-eslint/directive-selector': [
      'error',
      {
        type: 'attribute',
        prefix: 'natu',
        style: 'camelCase',
      },
    ],
    '@angular-eslint/component-selector': [
      'error',
      {
        type: ['attribute', 'element'],
        prefix: 'natu',
        style: 'kebab-case',
      },
    ],
  },
});

export default defineConfig(
  ...shared.configs.base,
  ...shared.configs.angular,
  ...shared.configs.storybook,
  ...shared.configs.vitest,
  ...shared.configs.vrt,
  ...restrictedImportsConfig,
  ...appConfig,
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
);
