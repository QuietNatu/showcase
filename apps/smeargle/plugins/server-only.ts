import type { Plugin } from 'vite';

/**
 * Vite plugin that prevents server code from being imported in the client.
 *
 * To use it, server files should have a `.server.ts` suffix.
 */
export function serverOnly(): Plugin {
  // eslint-disable-next-line functional/no-let -- vite plugins need to use mutations to store variables
  let isDev = false;

  return {
    name: 'vite-plugin-server-only',
    enforce: 'pre',
    configResolved(config) {
      isDev = config.command === 'serve';
    },
    resolveId(source, importer, options) {
      if (!isDev && importer && !options.ssr && /\.server(\.[tj]s)?$/.test(source)) {
        // eslint-disable-next-line functional/no-throw-statements -- vite expects plugins to throw errors
        throw new Error(
          `Server-only module imported into client bundle\n\n` +
            `Module: ${source}\n` +
            `Imported in: ${importer}\n`,
        );
      }

      return null;
    },
  };
}
