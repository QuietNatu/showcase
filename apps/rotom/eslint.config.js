import tseslint from 'typescript-eslint';
import projectConfig from '@natu/eslint-config';

export default tseslint.config(
  ...projectConfig.configs.angular,
  ...projectConfig.configs.jasmine,
  ...projectConfig.configs.storybook,
  ...projectConfig.configs.vrt,
  ...projectConfig.configs.e2e,
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
