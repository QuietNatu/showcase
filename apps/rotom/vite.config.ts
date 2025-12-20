/// <reference types="vitest" />

import { defineConfig } from 'vite';
import { playwright } from '@vitest/browser-playwright';
import angular from '@analogjs/vite-plugin-angular';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig(({ mode }) => {
  const isDebugMode = Boolean(process.env.TEST_DEBUG);

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
      globals: true, // TODO: set to false once Analog supports it
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
        include: ['src/**/*.{html,js,jsx,ts,tsx}'],
        exclude: [
          '**/*.test.*',
          '**/*.stories.*',
          '**/*.vrt.*',
          'src/gen',
          'src/test',
          'src/main.ts',
          'src/index.html',
          'src/app/app.config.ts',
          'src/app/app.routes.ts',
        ],
        reporter: ['lcov', 'text-summary'],
      },

      browser: {
        api: {
          port: 6102,
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

    define: {
      'import.meta.vitest': mode !== 'production',
    },
  };
});
