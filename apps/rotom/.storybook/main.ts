import type { StorybookConfig } from '@storybook/angular';
import type { StorybookConfigVite } from '@storybook/builder-vite';

import { join, dirname } from 'path';

/**
 * This function is used to resolve the absolute path of a package.
 * It is needed in projects that use Yarn PnP or are set up within a monorepo.
 */
function getAbsolutePath(value: string): string {
  return dirname(require.resolve(join(value, 'package.json')));
}

const isDevMode = process.env.NODE_ENV === 'development';

const config: StorybookConfig & StorybookConfigVite = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    getAbsolutePath('@storybook/addon-essentials'),
    getAbsolutePath('@storybook/addon-a11y'),
  ],
  framework: {
    name: getAbsolutePath('@storybook/angular'),
    options: {},
  },
  core: {
    builder: {
      name: '@storybook/builder-vite',
      options: {
        viteConfigPath: undefined,
      },
    },
  },

  viteFinal: async (config) => {
    const { mergeConfig } = await import('vite');
    const { default: angular } = await import('@analogjs/vite-plugin-angular');

    // TODO: storybook:build not working

    return mergeConfig(config, {
      optimizeDeps: {
        include: [
          '@storybook/angular',
          '@storybook/angular/dist/client/index.js',
          '@angular/compiler',
          '@storybook/addon-a11y',
          '@storybook/addon-docs/angular',
          '@storybook/blocks',
          '@storybook/test',
          'tslib',
          '@natu/axe', // TODO: recheck this after tsconfig paths
        ],
      },
      plugins: [
        angular({ jit: !isDevMode, liveReload: isDevMode, tsconfig: './.storybook/tsconfig.json' }),
      ],
      define: {
        STORYBOOK_ANGULAR_OPTIONS: JSON.stringify({
          experimentalZoneless: false,
        }),
      },
    });
  },
};
export default config;
