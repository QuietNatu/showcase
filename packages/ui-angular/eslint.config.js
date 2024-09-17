const tseslint = require('typescript-eslint');
const projectConfig = require('@natu/eslint-config');

module.exports = tseslint.config(
  ...projectConfig.configs.angular,
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
  ...projectConfig.configs.jasmine,
  ...projectConfig.configs.vrt,
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: __dirname,
      },
    },
  },
);
