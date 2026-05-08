/// <reference types="vitest/config" />

import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig(() => {
  return {
    plugins: [react()],

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
  };
});
