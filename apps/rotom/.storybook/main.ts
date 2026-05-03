import type { StorybookConfig } from '@analogjs/storybook-angular';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import tsconfigPaths from 'vite-tsconfig-paths';
import { mergeConfig } from 'vite';

/**
 * This function is used to resolve the absolute path of a package.
 * It is needed in projects that use Yarn PnP or are set up within a monorepo.
 */
function getAbsolutePath(value: string): string {
  return dirname(fileURLToPath(import.meta.resolve(`${value}/package.json`)));
}

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [getAbsolutePath('@storybook/addon-a11y'), getAbsolutePath('@storybook/addon-docs')],
  framework: {
    name: getAbsolutePath('@analogjs/storybook-angular'),
    options: {},
  },
  viteFinal: async (config) => {
    return mergeConfig(config, {
      plugins: [tsconfigPaths({ configNames: ['tsconfig.json'] })],
    });
  },
};

export default config;
