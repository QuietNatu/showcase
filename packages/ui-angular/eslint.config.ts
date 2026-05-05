import shared from '@natu/eslint-config-shared';

import { defineConfig } from 'eslint/config';
import { globalIgnores } from 'eslint/config';

export default defineConfig(
  globalIgnores(shared.defaultIgnores),
  ...shared.configs.base,
  ...shared.configs.angular,
  ...shared.configs.storybook,
  ...shared.configs.vitest,
  ...shared.configs.vrt,
  {
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
          patterns: [...shared.utils.buildRestrictedPatterns('@natu/ui-angular')],
        },
      ],
    },
  },
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
  ...shared.configs.prettier,
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
);
