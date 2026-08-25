import shared from '@natu/eslint-config-shared';

import { defineConfig } from 'eslint/config';

const restrictedImportsConfig = defineConfig({
  rules: {
    'no-restricted-imports': [
      'error',
      {
        patterns: [...shared.utils.buildRestrictedPatterns('@natu/vrt')],
      },
    ],
  },
});

export default defineConfig(
  ...shared.configs.base,
  ...shared.configs.playwright,
  ...restrictedImportsConfig,
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
);
