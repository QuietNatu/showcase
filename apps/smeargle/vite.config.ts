/// <reference types="vitest/config" />

import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { playwright } from '@vitest/browser-playwright';
import browserslistToEsbuild from 'browserslist-to-esbuild';
import { tanstackStart } from '@tanstack/react-start/plugin/vite';
import { serverOnly } from './plugins/server-only';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const isTest = mode === 'test';
  const isStorybook = process.env.STORYBOOK === 'true';

  if (isTest) {
    // eslint-disable-next-line functional/immutable-data -- needed while tanstack plugin is disabled
    Object.assign(process.env, loadEnv(mode, process.cwd(), ''));
  }

  return {
    plugins: [
      // Tanstack plugin should be enabled once it does not cause coverage issues or break server functions in tests
      !isTest &&
        !isStorybook &&
        tanstackStart({
          srcDirectory: './src/app',
          router: {
            generatedRouteTree: './route-tree.gen.ts',
            routeFileIgnorePattern: '.(stories|test).tsx',
            routesDirectory: './routes',
          },
          start: {
            entry: 'entrypoints/start.ts',
          },
          client: {
            entry: 'entrypoints/client.ts',
          },
          server: {
            entry: 'entrypoints/server.ts',
          },
        }),
      react(),
      serverOnly(),
    ],

    build: {
      target: browserslistToEsbuild(),
    },

    server: {
      open: !isTest,
      port: 6001,
    },

    preview: {
      port: 6001,
    },

    test: {
      globals: false,
      css: false,
      restoreMocks: true,
      unstubEnvs: true,
      unstubGlobals: true,
      reporters: ['default'],
      sequence: {
        shuffle: true,
      },
      coverage: {
        thresholds: {
          branches: 80,
          functions: 80,
          lines: 80,
          statements: 80,
        },

        // config
        provider: 'v8',
        include: ['src/**/*.{js,jsx,ts,tsx}'],
        exclude: [
          '**/*.test.*',
          '**/*.stories.*',
          '**/*.vrt.*',
          'src/@types',
          'src/mocks',
          'src/test',
          'src/shared/api/gen',
          'src/app/routes',
          'src/app/server',
          'src/app/entrypoints',
          'src/app/router.tsx',
          'src/app/route-tree.gen.ts',
          'src/main.tsx',
        ],
        reporter: ['lcov', 'text-summary'],
      },

      // TODO: move to separate vitest file
      projects: [
        {
          extends: true,
          test: {
            include: ['src/**/*.test.{js,jsx,ts,tsx}'],
            exclude: ['**/*.server.test.{js,jsx,ts,tsx}'],
            setupFiles: ['src/test/setup-tests.ts'],

            browser: {
              api: {
                port: 6002,
              },
              enabled: true,
              headless: true,
              provider: playwright(),
              // https://vitest.dev/guide/browser/playwright
              instances: [{ browser: 'chromium' }],
              screenshotFailures: false,
            },
          },
        },
        {
          extends: true,
          test: {
            include: ['src/**/*.server.test.{js,jsx,ts,tsx}'],
            setupFiles: ['src/test/setup-server-tests.ts'],
            environment: 'node',
          },
        },
      ],
    },
  };
});
