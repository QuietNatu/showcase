import tseslint from 'typescript-eslint';
import projectConfig from '@natu/eslint-config';

export default tseslint.config(
  ...projectConfig.configs.react,
  ...projectConfig.configs.vitest,
  ...projectConfig.configs.vrt,
  ...projectConfig.configs.storybook,
  {
    ignores: projectConfig.defaultIgnores,
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
