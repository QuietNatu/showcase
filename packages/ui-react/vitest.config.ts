import { playwright } from '@vitest/browser-playwright';
import { defineConfig, mergeConfig } from 'vitest/config';

import viteConfig from './vite.config';

// https://vite.dev/config/
export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      globals: false,
      css: false,
      restoreMocks: true,
      unstubEnvs: true,
      unstubGlobals: true,
      include: ['src/**/*.test.{js,jsx,ts,tsx}'],
      setupFiles: 'src/test/setup-tests.ts',
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
          '**/index.*',
          'src/lib/test',
          'src/main.tsx',
          'src/@types',
          'src/lib/test',
          'src/@types',
          'src/lib/stories',
        ],
        reporter: ['lcov', 'text-summary'],
      },

      browser: {
        api: {
          port: 6012,
        },
        enabled: true,
        headless: true,
        provider: playwright(),
        // https://vitest.dev/guide/browser/playwright
        instances: [{ browser: 'chromium' }],
        screenshotFailures: false,
      },
    },
  }),
);
