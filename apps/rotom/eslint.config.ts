import shared from '@natu/eslint-config-shared';

import { defineConfig } from 'eslint/config';
import { globalIgnores } from 'eslint/config';

const restrictedImportsConfig = defineConfig({
  rules: {
    'no-restricted-imports': [
      'error',
      {
        patterns: [...shared.utils.buildRestrictedPatterns('rotom')],
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
  ...shared.configs.playwright,
  ...shared.configs.vrt,
  ...restrictedImportsConfig,
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
