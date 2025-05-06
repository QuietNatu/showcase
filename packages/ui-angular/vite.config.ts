/// <reference types="vitest" />

import { defineConfig } from 'vite';

import angular from '@analogjs/vite-plugin-angular';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig(({ mode }) => {
  const isDebugMode = Boolean(process.env['TEST_DEBUG']);

  return {
    plugins: [
      angular({
        jit: false,
        tsconfig: './tsconfig.test.json',
      }),
      // Only needed because Angular does not support importing uncompiled libraries
      tsconfigPaths({ configNames: ['tsconfig.test.json'] }),
    ],

    preview: {
      port: 6101,
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
        all: true, // Note: this does not work. Currently angular plugin has a bug where untested files are missing
        provider: 'istanbul', // TODO: use v8 once the angular integration is fixed
        include: ['src/**/*.{html,js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
        exclude: ['**/*.test.*', '**/*.stories.*', '**/*.vrt.*', 'src/test'],
        reporter: ['lcov', 'text-summary'],
      },

      browser: {
        api: {
          port: 6102,
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

    define: {
      'import.meta.vitest': mode !== 'production',
    },
  };
});
