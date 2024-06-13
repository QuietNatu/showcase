import type { Plugin, ResolvedConfig } from 'vite';
import { normalizePath } from 'vite';
import path from 'path';
import picomatch from 'picomatch';
import { bundleLocales, saveLocales } from '@natu/utils/node';

/* TODO: check what is still needed */

interface BundleI18nOptions {
  source: string;
  destination: string;
}

/**
 * Bundles i18n translations files into a single file.
 * This is to avoid having multiple translation files
 * in production and having to perform a HTTP request
 * for each of them.
 */
export default function bundleI18n(options: BundleI18nOptions): Plugin {
  const { source, destination: destinationDir } = options;

  const bundledFileName = 'translation.json';
  const virtualModuleId = 'virtual:i18n';
  const resolvedVirtualModuleId = '\0' + virtualModuleId;

  let config: ResolvedConfig;
  let bundledLocales: Map<string, Record<string, unknown>>;

  let webSourcePath: string;
  let isLocale: picomatch.Matcher;

  let fileSourcePath: string;
  let shouldReload: picomatch.Matcher;

  return {
    name: 'vite-plugin-bundle-i18n',
    configResolved(resolvedConfig) {
      config = resolvedConfig;

      if (config.command === 'serve') {
        webSourcePath = `${config.base}${destinationDir}`;
        fileSourcePath = normalizePath(path.resolve(config.root, source));

        const webSourceFilesPath = `${config.base}${destinationDir}/*/${bundledFileName}`;
        isLocale = picomatch(webSourceFilesPath);

        const fileSourceFilesPath = normalizePath(path.resolve(config.root, source, '**/*.json'));
        shouldReload = picomatch(fileSourceFilesPath);
      }
    },
    buildStart() {
      bundledLocales = bundleLocales({ root: config.root, source });
    },
    resolveId(id) {
      return id === virtualModuleId ? resolvedVirtualModuleId : undefined;
    },
    load(id) {
      return id === resolvedVirtualModuleId
        ? `export default new Map(${JSON.stringify(Array.from(bundledLocales))})`
        : undefined;
    },
    writeBundle() {
      const destination = path.resolve(config.root, config.build.outDir, destinationDir);
      saveLocales({ root: config.root, destination, bundledLocales, filename: bundledFileName });
    },
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (req.originalUrl && isLocale(req.originalUrl)) {
          const requestedLanguage = req.originalUrl
            .substring(webSourcePath.length + 1)
            .split('/')[0]!;

          const locale = bundledLocales.get(requestedLanguage);

          res.end(JSON.stringify(locale));
        } else {
          next();
        }
      });
    },
    handleHotUpdate({ file, server }) {
      if (shouldReload(normalizePath(file))) {
        const changedLanguage = file.substring(fileSourcePath.length + 1).split('/')[0]!;

        const bundledLocale = bundleLocales({
          root: config.root,
          source,
          language: changedLanguage,
        }).get(changedLanguage);

        if (bundledLocale) {
          bundledLocales.set(changedLanguage, bundledLocale);

          server.ws.send({ type: 'full-reload', path: '*' });
        }
      }
    },
  };
}
