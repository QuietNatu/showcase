/// <reference types="vitest" />

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { playwright } from '@vitest/browser-playwright';
import browserslistToEsbuild from 'browserslist-to-esbuild';
import { tanstackStart } from '@tanstack/react-start/plugin/vite';

// TODO: remove testdebug and replace with ui?

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const isDebugMode = Boolean(process.env.TEST_DEBUG);

  return {
    plugins: [
      // Tanstack breaks coverage if plugin is active
      mode !== 'test' &&
        tanstackStart({
          srcDirectory: './src/app',
          router: {
            generatedRouteTree: './routeTree.gen.ts',
            routeFileIgnorePattern: '.(stories|test).tsx',
            routesDirectory: './routes',
          },
        }),
      react(),
    ],

    build: {
      target: browserslistToEsbuild(),
    },

    server: {
      open: mode !== 'test',
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
      include: ['src/**/*.test.{js,jsx,ts,tsx}'],
      setupFiles: ['src/test/setup-tests.ts'],
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
          'src/gen',
          'src/mocks',
          'src/test',
          'src/main.tsx',
          'src/app/router.tsx',
          'src/app/routeTree.gen.ts',
        ],
        reporter: ['lcov', 'text-summary'],
      },

      browser: {
        api: {
          port: 6002,
        },
        enabled: true,
        headless: !isDebugMode,
        provider: playwright(),
        // https://vitest.dev/guide/browser/playwright
        instances: [{ browser: 'chromium' }],
        screenshotFailures: false,
      },

      reporters: ['default'],
    },
  };
});
