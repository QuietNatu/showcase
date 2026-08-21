import angular from '@analogjs/vite-plugin-angular';
import { playwright } from '@vitest/browser-playwright';
import { defineConfig, mergeConfig } from 'vitest/config';

import viteConfig from './vite.config';

const isDebugMode = Boolean(process.env.TEST_DEBUG);

export default mergeConfig(
  viteConfig,
  defineConfig({
    plugins: [
      angular({
        jit: false,
        tsconfig: './tsconfig.test.json',
      }),
    ],

    test: {
      globals: true, // TODO: set to false once Analog supports it
      css: false,
      restoreMocks: true,
      unstubEnvs: true,
      unstubGlobals: true,
      include: ['src/**/*.test.{js,jsx,ts,tsx}'],
      setupFiles: ['src/test/setup-tests.ts'],
      sequence: {
        shuffle: true,
      },
      reporters: ['default'],
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
          'src/shared/api/gen',
          'src/mocks',
          'src/test',
          'src/environments',
          'src/main.ts',
          'src/main.development.ts',
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
    },
  }),
);
