import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import type { StorybookConfig } from '@analogjs/storybook-angular';
import type { StorybookConfigVite } from '@storybook/builder-vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import { mergeConfig } from 'vite';

function getAbsolutePath(value: string): string {
  return dirname(fileURLToPath(import.meta.resolve(`${value}/package.json`)));
}

const config: StorybookConfig & StorybookConfigVite = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [getAbsolutePath('@storybook/addon-a11y'), getAbsolutePath('@storybook/addon-docs')],
  framework: {
    name: getAbsolutePath('@analogjs/storybook-angular'),
    options: {},
  },
  viteFinal: async (config) => {
    return mergeConfig(config, {
      plugins: [tsconfigPaths({ configNames: ['tsconfig.json'] })],
      define: {
        STORYBOOK_ANGULAR_OPTIONS: JSON.stringify({
          experimentalZoneless: true,
        }),
      },
      resolve: {
        alias: { 'zone.js': fileURLToPath(import.meta.resolve('./empty-zone.ts')) },
      },
    });
  },
};
export default config;
