import { defineConfig, mergeConfig } from 'vitest/config';

import viteConfig from './vite.config';

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      globals: false,
      css: true,
      restoreMocks: true,
      unstubEnvs: true,
      unstubGlobals: true,
      include: ['src/test/**/*.test.{js,jsx,ts,tsx}'],
      setupFiles: [],
      environment: 'happy-dom',
      reporters: ['default'],
      sequence: {
        shuffle: true,
      },
    },
  }),
);
