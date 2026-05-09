import { playwright } from '@vitest/browser-playwright';
import { loadEnv, mergeConfig } from 'vite';
import { defineConfig } from 'vitest/config';

import viteConfig from './vite.config';

// TODO: [vite:react-swc] We recommend switching to `@vitejs/plugin-react` for improved performance as no swc plugins are used. More information at https://vite.dev/rolldown

export default defineConfig((configEnv) => {
  // eslint-disable-next-line functional/immutable-data -- needed while tanstack plugin is disabled
  Object.assign(process.env, loadEnv(configEnv.mode, process.cwd(), ''));

  return mergeConfig(
    viteConfig(configEnv),
    defineConfig({
      test: {
        globals: false,
        css: false,
        restoreMocks: true,
        unstubEnvs: true,
        unstubGlobals: true,
        reporters: ['default'],
        sequence: {
          shuffle: true,
        },
        coverage: {
          thresholds: {
            branches: 80,
            functions: 80,
            lines: 80,
            statements: 80,
          },

          // config
          provider: 'v8',
          include: ['src/**/*.{js,jsx,ts,tsx}'],
          exclude: [
            '**/*.test.*',
            '**/*.stories.*',
            '**/*.vrt.*',
            'src/@types',
            'src/mocks',
            'src/test',
            'src/shared/api/gen',
            'src/app/routes',
            'src/app/server',
            'src/app/entrypoints',
            'src/app/router.tsx',
            'src/app/route-tree.gen.ts',
            'src/main.tsx',
          ],
          reporter: ['lcov', 'text-summary'],
        },

        projects: [
          {
            extends: true,
            test: {
              name: 'client',
              include: ['src/**/*.test.{js,jsx,ts,tsx}'],
              exclude: ['**/*.server.test.{js,jsx,ts,tsx}'],
              setupFiles: ['src/test/setup-tests.ts'],

              browser: {
                api: {
                  port: 6002,
                },
                enabled: true,
                headless: true,
                provider: playwright(),
                // https://vitest.dev/guide/browser/playwright
                instances: [{ browser: 'chromium' }],
                screenshotFailures: false,
              },
            },
          },
          {
            extends: true,
            test: {
              name: 'server',
              include: ['src/**/*.server.test.{js,jsx,ts,tsx}'],
              setupFiles: ['src/test/setup-server-tests.ts'],
              environment: 'node',
            },
          },
        ],
      },
    }),
  );
});
