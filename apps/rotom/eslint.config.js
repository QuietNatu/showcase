// @ts-check

import tseslint from 'typescript-eslint';
import shared from '@natu/eslint-config-shared';
import { globalIgnores } from 'eslint/config';

export default tseslint.config(
  globalIgnores(shared.defaultIgnores),
  ...shared.configs.angular,
  ...shared.configs.storybook,
  ...shared.configs.vitest,
  ...shared.configs.vrt,
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
