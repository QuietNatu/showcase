// @ts-check

import { defineConfig } from 'eslint/config';
import shared from '@natu/eslint-config-shared';
import { globalIgnores } from 'eslint/config';

export default defineConfig(
  globalIgnores(shared.defaultIgnores),
  ...shared.configs.base,
  ...shared.configs.react,
  ...shared.configs.storybook,
  ...shared.configs.prettier,
);
