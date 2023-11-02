/// <reference types="vitest" />

import { defineConfig } from 'vite';
import solid from 'vite-plugin-solid';
import tsconfigPaths from 'vite-tsconfig-paths';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  return {
    plugins: [solid(), tsconfigPaths()],

    server: {
      open: mode !== 'test',
      port: 5273,
    },

    // fixes: vite-plugin-solid not importing node exports
    resolve: {
      alias: {
        'msw/node': `${dirname(fileURLToPath(import.meta.url))}/node_modules/msw/lib/node`,
        '@mswjs/interceptors/ClientRequest': `${dirname(
          fileURLToPath(import.meta.url),
        )}/node_modules/@mswjs/interceptors/lib/node/interceptors/ClientRequest`,
      },
    },

    test: {
      globals: true,
      css: false,
      include: ['src/**/*.test.*'],
      environment: 'jsdom',
      setupFiles: 'src/test/setup-tests.ts',
      transformMode: { web: [/\.[jt]sx?$/] },
      coverage: {
        // threshold
        branches: 90,
        functions: 90,
        lines: 90,
        statements: 90,

        // config
        all: true,
        provider: 'v8',
        include: ['src/**/*.{ts,tsx}'],
        exclude: [
          '**/*.test.*',
          '**/*.stories.*',
          'src/test',
          'src/mocks',
          'src/index.tsx',
          'src/vite-env.d.ts',
          'src/service-worker.ts',
        ],
        reporter: ['lcov', 'text-summary'],
      },
    },
  };
});
