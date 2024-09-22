const tseslint = require('typescript-eslint');
const projectConfig = require('@natu/eslint-config');

module.exports = tseslint.config(
  ...projectConfig.configs.angular,
  ...projectConfig.configs.jasmine,
  ...projectConfig.configs.storybook,
  ...projectConfig.configs.vrt,
  ...projectConfig.configs.e2e,
  {
    ignores: ['src/api/'],
  },
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: __dirname,
      },
    },
  },
);
