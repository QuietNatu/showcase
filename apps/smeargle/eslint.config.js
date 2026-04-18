// @ts-check

import { defineConfig } from 'eslint/config';
import shared from '@natu/eslint-config-shared';
import { globalIgnores } from 'eslint/config';

const restrictedImports = [
  {
    name: '@tanstack/react-start',
    message: 'This package may only be imported from within src/app',
  },
  {
    name: 'effect',
    message: 'This package may only be imported from within src/shared/lib',
  },
  {
    name: 'axios',
    message: 'Use "apiClient" instead',
  },
];

const restrictImports = defineConfig(
  {
    rules: {
      'no-restricted-imports': ['error', { paths: restrictedImports }],
    },
  },
  {
    files: ['src/app/**/*.{js,ts,jsx,tsx}'],
    rules: {
      'no-restricted-imports': [
        'error',
        { paths: restrictedImports.filter(({ name }) => name !== '@tanstack/react-start') },
      ],
    },
  },
  {
    files: ['src/shared/lib/**/*.{js,ts,jsx,tsx}'],
    rules: {
      'no-restricted-imports': [
        'error',
        { paths: restrictedImports.filter(({ name }) => name !== 'effect') },
      ],
    },
  },
  {
    files: ['src/shared/api/**/*.{js,ts,jsx,tsx}'],
    rules: {
      'no-restricted-imports': [
        'error',
        { paths: restrictedImports.filter(({ name }) => name !== 'axios') },
      ],
    },
  },
);

export default defineConfig(
  globalIgnores(shared.defaultIgnores),
  ...shared.configs.react,
  ...shared.configs.storybook,
  ...shared.configs.vitest,
  ...shared.configs.vrt,
  ...restrictImports,
  ...shared.configs.prettier,
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
);
