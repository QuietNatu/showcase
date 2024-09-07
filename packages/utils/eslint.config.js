import tseslint from 'typescript-eslint';
import projectConfig from '@natu/eslint-config';

export default tseslint.config(
  ...projectConfig.config.base,
  ...projectConfig.config.vitest,
  /* TODO: move this */
  {
    ignores: [
      'node_modules/',
      'dist/',
      'coverage/',
      'public/',
      'vite.config.ts',
      'playwright.config.ts',
      'eslint.config.js',
      'commitlint.config.js',
      'lint-staged.config.js',
      'prettier.config.js',
      'stylelint.config.js',
      'postcss.config.js',
    ],
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
