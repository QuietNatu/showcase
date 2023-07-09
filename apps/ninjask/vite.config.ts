import { defineConfig } from 'vite';
import solid from 'vite-plugin-solid';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  return {
    plugins: [solid()],

    server: {
      open: mode !== 'test',
      port: 5273,
    },
  };
});
