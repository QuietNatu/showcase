import tseslint from 'typescript-eslint';
import projectConfig from '@natu/eslint-config';

export default tseslint.config(
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
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
);
