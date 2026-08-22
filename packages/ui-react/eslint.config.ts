import shared from '@natu/eslint-config-shared';

import { defineConfig } from 'eslint/config';

const restrictedImportsConfig = defineConfig({
  rules: {
    'no-restricted-imports': [
      'error',
      {
        patterns: [...shared.utils.buildRestrictedPatterns('@natu/ui-react')],
      },
    ],
  },
});

export default defineConfig(
  ...shared.configs.base,
  ...shared.configs.react,
  ...shared.configs.storybook,
  ...shared.configs.vitest,
  ...shared.configs.vrt,
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
