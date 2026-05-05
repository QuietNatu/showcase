import shared from '@natu/eslint-config-shared';

import { defineConfig } from 'eslint/config';
import { globalIgnores } from 'eslint/config';

export default defineConfig(
  globalIgnores(shared.defaultIgnores),
  ...shared.configs.base,
  ...shared.configs.react,
  ...shared.configs.storybook,
  {
    rules: {
      'no-restricted-imports': [
        'error',
        { patterns: [...shared.utils.buildRestrictedPatterns('@natu/stories')] },
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
