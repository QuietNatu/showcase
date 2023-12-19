/// <reference types="vitest" />

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig(({}) => {
  return {
    plugins: [react()],

    test: {
      globals: true,
      css: false,
      restoreMocks: true,
      include: ['src/**/*.test.*'],
      environment: 'jsdom',
      setupFiles: 'src/test/setup-tests.ts',
      coverage: {
        // threshold
        branches: 80,
        functions: 80,
        lines: 80,
        statements: 80,

        // config
        provider: 'v8',
        include: ['src/lib/**/*.{ts,tsx}'],
        exclude: [
          '**/*.test.*',
          '**/*.stories.*',
          '**/*.vrt.*',
          '**/index.*',
          'src/lib/test',
          'src/lib/stories',
        ],
        reporter: ['lcov', 'text-summary'],
      },
    },
  };
});
