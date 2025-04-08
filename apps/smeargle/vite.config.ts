import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  return {
    plugins: [react()],

    server: {
      open: mode !== 'test',
      port: 6001,
    },

    preview: {
      port: 6001,
    },
  };
});
