const tseslint = require('typescript-eslint');
const projectConfig = require('@natu/eslint-config');

module.exports = tseslint.config(
  ...projectConfig.configs.angular,
  ...projectConfig.configs.jasmine,
  ...projectConfig.configs.vrt,
  ...projectConfig.configs.storybook,
  {
    files: ['**/*.ts'],
    rules: {
      '@angular-eslint/directive-selector': [
        'error',
        {
          type: 'attribute',
          prefix: 'natu',
          style: 'camelCase',
        },
      ],
      '@angular-eslint/component-selector': [
        'error',
        {
          type: ['attribute', 'element'],
          prefix: 'natu',
          style: 'kebab-case',
        },
      ],
    },
  },
  {
    ignores: projectConfig.defaultIgnores,
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
