import shared from '@natu/eslint-config-shared';

import { defineConfig } from 'eslint/config';
import { globalIgnores } from 'eslint/config';

// TODO: use https://www.npmjs.com/package/vitest-browser-angular

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
  globalIgnores(shared.defaultIgnores),
  ...shared.configs.base,
  ...shared.configs.angular,
  ...shared.configs.storybook,
  ...shared.configs.vitest,
  ...shared.configs.vrt,
  ...restrictedImportsConfig,
  ...appConfig,
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
