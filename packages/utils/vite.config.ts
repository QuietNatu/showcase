/// <reference types="vitest" />

import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig(({}) => {
  return {
    plugins: [tsconfigPaths()],

    test: {
      globals: true,
      css: false,
      restoreMocks: true,
      include: ['src/**/*.test.*'],
      environment: 'jsdom',
      setupFiles: 'src/test/setup-tests.ts',
      coverage: {
        // threshold
        branches: 90,
        functions: 90,
        lines: 90,
        statements: 90,

        // config
        all: true,
        provider: 'v8',
        include: ['src/**/*.ts'],
        exclude: ['**/*.test.*', '**/index.*', 'src/test', 'src/mocks'],
        reporter: ['lcov', 'text-summary'],
      },
    },
  };
});
