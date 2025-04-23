/// <reference types="vitest" />

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const isDebugMode = Boolean(process.env['TEST_DEBUG']);

  return {
    plugins: [react()],

    test: {
      globals: true,
      css: false,
      restoreMocks: true,
      unstubEnvs: true,
      unstubGlobals: true,
      include: ['src/**/*.test.*'],
      setupFiles: 'src/test/setup-tests.ts',
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
        include: ['src/**/*.test.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
        exclude: [
          '**/*.test.*',
          '**/*.stories.*',
          '**/*.vrt.*',
          '**/index.*',
          'src/lib/test',
          'src/main.tsx',
          'src/@types',
          'src/lib/test',
          'src/@types',
          'src/lib/stories',
        ],
        setupFiles: ['src/test/setup-tests.ts'],
        reporter: ['lcov', 'text-summary'],
      },

      browser: {
        api: {
          port: 6012,
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
