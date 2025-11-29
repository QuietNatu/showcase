/// <reference types="vitest" />

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

  test: {
    globals: true,
    css: true,
    restoreMocks: true,
    unstubEnvs: true,
    unstubGlobals: true,
    include: ['src/test/**/*.test.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    setupFiles: [],
    environment: 'happy-dom',
    reporters: ['default'],
  },
});
