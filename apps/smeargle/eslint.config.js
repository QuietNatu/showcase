// @ts-check

import tseslint from 'typescript-eslint';
import projectConfig from '@natu/eslint-config-shared';

export default tseslint.config(
  ...projectConfig.configs.react,
  // ...projectConfig.configs.vitest,
  // ...projectConfig.configs.vrt,
  // ...projectConfig.configs.storybook,
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
);
