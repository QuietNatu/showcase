import type { Plugin, ResolvedConfig } from 'vite';
import { normalizePath } from 'vite';
import fs from 'fs';
import path from 'path';
import picomatch from 'picomatch';
import { bundleLocale, bundleLocales, saveLocale, saveLocales } from '@natu/utils/node';

interface BundleI18nOptions {
  source: string;
  /** Destination of the files to be used while developing. */
  devDestination: string;
  /** Destination of the files to be used when application is build. Not needed if files are dynamically imported. */
  buildDestination?: string;
  /** Name of the generated bundle json file. */
  filename: string;
}

/**
 * Bundles i18n translations files into a single file.
 * This is to avoid having multiple translation files
 * in production and having to perform a HTTP request
 * for each of them.
 */
export default function bundleI18n(options: BundleI18nOptions): Plugin {
  const { source, devDestination, buildDestination } = options;
  const bundledFilename = `${options.filename}.json`;

  let config: ResolvedConfig;

  let webSourcePath: string | undefined;
  let isLocale: picomatch.Matcher;

  let fileSourcePath: string;
  let shouldReload: picomatch.Matcher;

  return {
    name: 'vite-plugin-bundle-i18n',
    enforce: 'pre',
    configResolved(resolvedConfig) {
      config = resolvedConfig;

      if (config.command === 'serve') {
        webSourcePath = buildDestination ? `${config.base}${buildDestination}` : undefined;
        fileSourcePath = normalizePath(path.resolve(config.root, source));

        const webSourceFilesPath = `${config.base}${buildDestination}/*/${bundledFilename}`;
        isLocale = picomatch(webSourceFilesPath);

        const fileSourceFilesPath = normalizePath(path.resolve(config.root, source, '**/*.json'));
        shouldReload = picomatch(fileSourceFilesPath);
      }
    },
    buildStart() {
      const bundledLocales = bundleLocales({ root: config.root, source });
      const destination = path.resolve(config.root, devDestination);
      // At first glance virtual modules would be better for this but since typescript types depend on the generated translations they need to be persisted.
      saveLocales({ root: config.root, destination, bundledLocales, filename: bundledFilename });
    },
    writeBundle() {
      if (buildDestination) {
        const source = path.resolve(config.root, devDestination);
        const destination = path.resolve(config.root, config.build.outDir, buildDestination);

        fs.cpSync(source, destination, { recursive: true });
      }
    },
    configureServer(server) {
      if (!buildDestination) {
        return;
      }

      server.middlewares.use((request, response, next) => {
        if (webSourcePath && request.originalUrl && isLocale(request.originalUrl)) {
          const language = request.originalUrl.substring(webSourcePath.length + 1).split('/')[0]!;
          const languagePath = path.resolve(config.root, devDestination, language, bundledFilename);

          if (fs.existsSync(languagePath)) {
            const fileData = fs.readFileSync(languagePath);
            response.end(fileData.toString());
          } else {
            response.writeHead(404);
            response.end();
          }
        } else {
          next();
        }
      });
    },
    handleHotUpdate({ file, server }) {
      if (shouldReload(normalizePath(file))) {
        const language = file.substring(fileSourcePath.length + 1).split('/')[0]!;

        const bundledLocale = bundleLocale({
          root: config.root,
          source,
          language: language,
        });

        const destination = path.resolve(config.root, devDestination);

        saveLocale({
          root: config.root,
          destination,
          language,
          filename: bundledFilename,
          bundledLocale,
        });

        server.ws.send({ type: 'full-reload', path: '*' });
      }
    },
  };
}
