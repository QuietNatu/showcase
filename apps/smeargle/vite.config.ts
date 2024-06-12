/// <reference types="vitest" />

import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tsconfigPaths from 'vite-tsconfig-paths';
import { VitePWA, VitePWAOptions } from 'vite-plugin-pwa';
import browserslistToEsbuild from 'browserslist-to-esbuild';
import svgr from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  const isE2e = env.VITE_E2E === 'true';

  return {
    plugins: [
      react(),
      tsconfigPaths(),
      svgr({
        svgrOptions: {
          ref: true,
          svgoConfig: {
            plugins: ['removeDimensions', 'cleanupAttrs'],
          },
        },
      }),
      VitePWA(isE2e ? { injectRegister: null } : pwaOptions),
    ],

    build: {
      target: browserslistToEsbuild(),
    },

    server: {
      open: mode !== 'test',
      port: 6001,
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
        branches: 80,
        functions: 80,
        lines: 80,
        statements: 80,

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
          'src/@types',
          'src/main.tsx',
          'src/service-worker.ts',
        ],
        reporter: ['lcov', 'text-summary'],
      },
    },
  };
});

const pwaOptions: Partial<VitePWAOptions> = {
  includeAssets: ['favicon.ico', 'favicon.svg', 'apple-touch-icon.png'],
  manifest: {
    name: 'Smeargle',
    short_name: 'Smeargle',
    theme_color: '#1976d2',
    background_color: '#fafafa',
    display: 'standalone',
    icons: [
      {
        src: 'icon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: 'icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  },
};
