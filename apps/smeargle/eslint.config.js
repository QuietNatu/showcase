import tseslint from 'typescript-eslint';
import projectConfig from '@natu/eslint-config';

export default tseslint.config(
  ...projectConfig.configs.react,
  ...projectConfig.configs.vitest,
  ...projectConfig.configs.vrt,
  ...projectConfig.configs.e2e,
  ...projectConfig.configs.storybook,
  {
    ignores: [...projectConfig.defaultIgnores, 'src/api/'],
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
