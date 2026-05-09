import { tanstackStart } from '@tanstack/react-start/plugin/vite';
import react from '@vitejs/plugin-react-swc';
import browserslistToEsbuild from 'browserslist-to-esbuild';
import { defineConfig } from 'vite';

import { serverOnly } from './plugins/server-only';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const isTest = mode === 'test';
  const isStorybook = process.env.STORYBOOK === 'true';

  return {
    plugins: [
      // Tanstack plugin should be enabled once it does not cause coverage issues or break server functions in tests
      !isTest &&
        !isStorybook &&
        tanstackStart({
          srcDirectory: './src/app',
          router: {
            generatedRouteTree: './route-tree.gen.ts',
            routeFileIgnorePattern: '.(stories|test).tsx',
            routesDirectory: './routes',
          },
          start: {
            entry: 'entrypoints/start.ts',
          },
          client: {
            entry: 'entrypoints/client.ts',
          },
          server: {
            entry: 'entrypoints/server.ts',
          },
        }),
      react(),
      serverOnly(),
    ],

    build: {
      target: browserslistToEsbuild(),
    },

    server: {
      open: true,
      port: 6001,
    },

    preview: {
      port: 6001,
    },
  };
});
