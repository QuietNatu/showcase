/// <reference types="vitest" />

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  return {
    plugins: [react(), tsconfigPaths()],

    server: {
      open: mode !== 'test',
      port: 5173,
    },

    test: {
      globals: true,
      css: false,
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
        provider: 'istanbul',
        include: ['src/**/*.{ts,tsx}'],
        exclude: [
          '**/*.test.*',
          '**/*.stories.*',
          'src/test',
          'src/mocks',
          'src/stories',
          'src/main.tsx',
          'src/vite-env.d.ts',
          'src/service-worker.ts',
        ],
        reporter: ['lcov', 'text-summary'],
      },
    },
  };
});
