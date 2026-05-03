// @ts-check

import { defineConfig } from 'eslint/config';
import shared from '@natu/eslint-config-shared';
import { globalIgnores } from 'eslint/config';

// TODO: improve this
const restrictImports = defineConfig({
  rules: {
    'no-restricted-imports': [
      'error',
      {
        paths: [
          {
            name: '@testing-library/angular',
            message: 'Use @testing-library/angular/zoneless instead',
          },
        ],
      },
    ],
  },
});

export default defineConfig(
  globalIgnores(shared.defaultIgnores),
  ...shared.configs.angular,
  ...shared.configs.storybook,
  ...shared.configs.vitest,
  ...shared.configs.vrt,
  ...restrictImports,
  ...shared.configs.prettier,
  {
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
  },
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
);
