/// <reference types="vitest" />

import { defineConfig } from 'vite';
import solid from 'vite-plugin-solid';

// https://vitejs.dev/config/
export default defineConfig(({}) => {
  return {
    plugins: [solid()],

    test: {
      globals: true,
      css: false,
      restoreMocks: true,
      include: ['src/**/*.test.*'],
      environment: 'jsdom',
      setupFiles: 'src/test/setup-tests.ts',
      transformMode: { web: [/\.[jt]sx?$/] },
      server: {
        deps: {
          // fixes: You appear to have multiple instances of Solid. This can lead to unexpected behavior.
          inline: [/solid-js/],
        },
      },
      coverage: {
        // threshold
        branches: 90,
        functions: 90,
        lines: 90,
        statements: 90,

        // config
        all: true,
        provider: 'v8',
        include: ['src/lib/**/*.{ts,tsx}'],
        exclude: ['**/*.test.*', '**/*.stories.*', '**/*.vrt.*', '**/index.*', 'src/lib/test'],
        reporter: ['lcov', 'text-summary'],
      },
    },
  };
});
