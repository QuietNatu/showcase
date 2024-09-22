import tseslint from 'typescript-eslint';
import projectConfig from '@natu/eslint-config';

export default tseslint.config(
  ...projectConfig.configs.base,
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    rules: {
      '@typescript-eslint/no-non-null-assertion': 'off',
      'functional/immutable-data': 'off',
      'functional/no-let': 'off',
    },
  },
);
