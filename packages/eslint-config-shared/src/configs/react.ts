import { Config, defineConfig } from 'eslint/config';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import jsxA11y from 'eslint-plugin-jsx-a11y';

import tanstackRouter from '@tanstack/eslint-plugin-router';

export const reactConfig = defineConfig({
  files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
  extends: [
    react.configs.flat.recommended as Config,
    react.configs.flat['jsx-runtime'] as Config,
    reactHooks.configs.flat.recommended,
    reactRefresh.configs.vite,
    jsxA11y.flatConfigs.recommended,
    tanstackRouter.configs['flat/recommended'],
  ],
  settings: {
    react: {
      version: '19.2',
    },
  },
  rules: {
    'react/button-has-type': [
      'error',
      {
        button: true,
        submit: true,
        reset: false,
      },
    ],
    'react/prefer-read-only-props': 'error',
  },
});
