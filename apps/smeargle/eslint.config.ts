import shared from '@natu/eslint-config-shared';

import { defineConfig } from 'eslint/config';
import { globalIgnores } from 'eslint/config';

const sharedRestrictedPatterns = shared.utils.buildRestrictedPatterns('smeargle');

const appRestrictedPatternsDictionary = {
  axios: {
    group: ['axios', 'axios/*'],
    message: 'Use "apiClient" instead',
  },
  effect: {
    group: ['effect', 'effect/*'],
    message: 'This package may only be imported from within src/shared/lib',
  },
  tanstackReactStart: {
    group: ['@tanstack/react-start', '@tanstack/react-start/*'],
    message: 'This package may only be imported from within src/app',
  },
};

const restrictedPatterns = [
  ...sharedRestrictedPatterns,
  ...Object.values(appRestrictedPatternsDictionary),
];

const restrictedImportsConfig = defineConfig(
  {
    rules: {
      'no-restricted-imports': ['error', { patterns: restrictedPatterns }],
    },
  },
  {
    files: ['src/app/**/*.{js,ts,jsx,tsx}', 'vite.config.ts'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: restrictedPatterns.filter(
            (pattern) => pattern !== appRestrictedPatternsDictionary.tanstackReactStart,
          ),
        },
      ],
    },
  },
  {
    files: ['src/shared/api/**/*.{js,ts,jsx,tsx}'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: restrictedPatterns.filter(
            (pattern) => pattern !== appRestrictedPatternsDictionary.axios,
          ),
        },
      ],
    },
  },
  {
    files: ['src/shared/lib/**/*.{js,ts,jsx,tsx}'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: restrictedPatterns.filter(
            (pattern) => pattern !== appRestrictedPatternsDictionary.effect,
          ),
        },
      ],
    },
  },
);

const routesConfig = defineConfig({
  // Routes are not pure react components as they can be server rendered.
  files: ['src/app/routes/**/*.{js,ts,jsx,tsx}'],
  rules: {
    'react-refresh/only-export-components': 'off',
  },
});

export default defineConfig(
  globalIgnores(shared.defaultIgnores),
  ...shared.configs.base,
  ...shared.configs.react,
  ...shared.configs.storybook,
  ...shared.configs.vitest,
  ...shared.configs.playwright,
  ...shared.configs.vrt,
  ...restrictedImportsConfig,
  ...routesConfig,
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
