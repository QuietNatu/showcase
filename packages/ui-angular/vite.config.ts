import { NodePackageImporter } from 'sass-embedded';
import { defineConfig } from 'vitest/config';

// https://vite.dev/config/
export default defineConfig({
  css: {
    preprocessorOptions: {
      scss: {
        importers: [new NodePackageImporter()],
      },
    },
  },

  preview: {
    port: 6101,
  },

  resolve: {
    // Only needed because Angular does not support importing uncompiled libraries
    tsconfigPaths: true,
  },
});
