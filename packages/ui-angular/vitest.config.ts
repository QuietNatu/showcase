import angular from '@analogjs/vite-plugin-angular';
import { playwright } from '@vitest/browser-playwright';
import { defineConfig } from 'vitest/config';

const isDebugMode = Boolean(process.env.TEST_DEBUG);

export default defineConfig({
  plugins: [
    angular({
      jit: false,
      tsconfig: './tsconfig.test.json',
    }),
  ],

  preview: {
    port: 6101,
  },

  resolve: {
    // Only needed because Angular does not support importing uncompiled libraries
    tsconfigPaths: true,
  },

  test: {
    globals: true, // TODO: set to false once Analog supports it
    css: false,
    restoreMocks: true,
    unstubEnvs: true,
    unstubGlobals: true,
    include: ['src/**/*.test.{js,jsx,ts,tsx}'],
    setupFiles: ['src/test/setup-tests.ts'],
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
      exclude: ['**/*.test.*', '**/*.stories.*', '**/*.vrt.*', 'src/test'],
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
});
