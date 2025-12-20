/// <reference types="vitest" />

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

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
    },
  };
});
