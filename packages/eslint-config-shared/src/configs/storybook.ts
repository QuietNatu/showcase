import { Config, defineConfig, globalIgnores } from 'eslint/config';

import storybook from 'eslint-plugin-storybook';

export const storybookConfig = defineConfig(
  globalIgnores(['!.storybook', '.storybook/main.ts', 'storybook-static/']),
  {
    files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
    extends: [storybook.configs['flat/recommended'] as Config],
    rules: {
      'unicorn/no-top-level-side-effects': 'off',
    },
  },
  {
    files: ['src/**/*.stories.[jt]s?(x)'],
    rules: {
      '@typescript-eslint/restrict-template-expressions': 'off',
      'security/detect-object-injection': 'off',
    },
  },
);
