/// <reference types="vitest" />

import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [],

  test: {
    globals: true,
    css: false,
    restoreMocks: true,
    unstubEnvs: true,
    unstubGlobals: true,
    include: ['src/**/*.test.*'],
    environment: 'jsdom',
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
      include: ['src/**/*.ts'],
      exclude: ['**/*.test.*', '**/index.*', '**/*.vrt.*', 'src/test', 'src/mocks'],
      reporter: ['lcov', 'text-summary'],
    },
  },
});
