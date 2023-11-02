/// <reference types="vitest" />

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig(({}) => {
  return {
    plugins: [react(), tsconfigPaths()],

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
        provider: 'v8',
        include: ['src/lib/**/*.{ts,tsx}'],
        exclude: ['**/*.test.*', '**/*.stories.*', '**/index.*', 'src/lib/test'],
        reporter: ['lcov', 'text-summary'],
      },
    },
  };
});
