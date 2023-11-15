/// <reference types="vitest" />

import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tsconfigPaths from 'vite-tsconfig-paths';
import { VitePWA, VitePWAOptions } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  const isE2e = env.VITE_E2E === 'true';

  return {
    plugins: [react(), tsconfigPaths(), VitePWA(isE2e ? { injectRegister: null } : pwaOptions)],

    server: {
      open: mode !== 'test',
      port: 5173,
    },

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
        include: ['src/**/*.{ts,tsx}'],
        exclude: [
          '**/*.test.*',
          '**/*.stories.*',
          '**/*.vrt.*',
          'src/test',
          'src/mocks',
          'src/main.tsx',
          'src/vite-env.d.ts',
          'src/service-worker.ts',
        ],
        reporter: ['lcov', 'text-summary'],
      },
    },
  };
});

const pwaOptions: Partial<VitePWAOptions> = {
  manifest: {
    name: 'Rotom',
    short_name: 'Rotom',
    theme_color: '#1976d2',
    background_color: '#fafafa',
    display: 'standalone',
    icons: [
      {
        src: 'icon-72x72.png',
        sizes: '72x72',
        type: 'image/png',
        purpose: 'maskable any',
      },
      {
        src: 'icon-96x96.png',
        sizes: '96x96',
        type: 'image/png',
        purpose: 'maskable any',
      },
      {
        src: 'icon-128x128.png',
        sizes: '128x128',
        type: 'image/png',
        purpose: 'maskable any',
      },
      {
        src: 'icon-144x144.png',
        sizes: '144x144',
        type: 'image/png',
        purpose: 'maskable any',
      },
      {
        src: 'icon-152x152.png',
        sizes: '152x152',
        type: 'image/png',
        purpose: 'maskable any',
      },
      {
        src: 'icon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable any',
      },
      {
        src: 'icon-384x384.png',
        sizes: '384x384',
        type: 'image/png',
        purpose: 'maskable any',
      },
      {
        src: 'icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable any',
      },
    ],
  },
};
