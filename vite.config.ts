/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  // https://github.com/vitest-dev/vitest
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
});
