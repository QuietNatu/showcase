/// <reference types="vitest" />

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import browserslistToEsbuild from 'browserslist-to-esbuild';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const isDebugMode = Boolean(process.env['TEST_DEBUG']);

  return {
    plugins: [react()],

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
      globals: true,
      css: false,
      restoreMocks: true,
      unstubEnvs: true,
      unstubGlobals: true,
      include: ['src/**/*.test.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
      setupFiles: ['src/test/setup-tests.ts'],
      coverage: {
        thresholds: {
          branches: 80,
          functions: 80,
          lines: 80,
          statements: 80,
        },

        // config
        all: true,
        provider: 'v8',
        include: ['src/**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
        exclude: [
          '**/*.test.*',
          '**/*.stories.*',
          '**/*.vrt.*',
          'src/test',
          'src/main.tsx',
          'src/@types',
        ],
        reporter: ['lcov', 'text-summary'],
      },

      browser: {
        api: {
          port: 6002,
        },
        enabled: true,
        headless: !isDebugMode,
        provider: 'playwright',
        // https://vitest.dev/guide/browser/playwright
        instances: [{ browser: 'chromium' }],
        screenshotFailures: false,
      },

      reporters: ['default'],
    },
  };
});
