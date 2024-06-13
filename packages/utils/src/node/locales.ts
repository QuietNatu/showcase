import fs from 'fs';
import path from 'path';

interface BundleLocalesOptions {
  /** The root path of the project. */
  root: string;
  /** The relative path to the source. */
  source: string;
  /** The only language to included in the bundle. */
  language?: string;
}

interface SaveLocalesOptions {
  /** The root path of the project. */
  root: string;
  /** The relative path to the destination. */
  destination: string;
  /** The name of the file to save to. */
  filename: string;
  /* The pre-bundled locales */
  bundledLocales: Map<string, Record<string, unknown>>;
}

/**
 * For every locale, recursively merges all json files into a single file.
 * The folder and file names will be used as keys for the created json.
 */
export function bundleLocales(options: BundleLocalesOptions): Map<string, Record<string, unknown>> {
  const { root, source, language: selectedLanguage } = options;

  const bundledLocales = fs
    .readdirSync(source)
    .filter((language) => !selectedLanguage || language === selectedLanguage)
    .map((language) => {
      const languageSource = path.resolve(root, source, language);

      if (!fs.lstatSync(languageSource).isDirectory()) {
        return;
      }

      const bundle = bundleLocale(languageSource);
      return [language, bundle] as const;
    })
    .filter((bundle): bundle is [string, Record<string, unknown>] => Boolean(bundle));

  return new Map(bundledLocales);
}

function bundleLocale(source: string): Record<string, unknown> {
  return fs
    .readdirSync(source)
    .map((file) => {
      const filePath = path.resolve(source, file);

      return {
        file,
        filePath,
        isDirectory: fs.lstatSync(filePath).isDirectory(),
      };
    })
    .filter(({ file, isDirectory }) => isDirectory || path.extname(file) === '.json')
    .map(({ file, filePath, isDirectory }) => {
      const namespace = path.parse(file).name;

      if (isDirectory) {
        return { namespace, json: bundleLocale(filePath) };
      } else {
        const fileData = fs.readFileSync(filePath);
        const json = JSON.parse(fileData.toString()) as Record<string, unknown>;

        return { namespace, json };
      }
    })
    .reduce<Record<string, unknown>>((bundle, { namespace, json }) => {
      // eslint-disable-next-line functional/immutable-data
      bundle[namespace] = json;
      return bundle;
    }, {});
}

/**
 * Writes bundled locales to a given destination.
 */
export function saveLocales(options: SaveLocalesOptions) {
  const { root, destination, bundledLocales, filename } = options;

  bundledLocales.forEach((bundle, language) => {
    const destinationDirPath = path.resolve(root, destination, language);
    const destinationPath = path.resolve(destinationDirPath, filename);

    fs.mkdirSync(destinationDirPath, { recursive: true });
    fs.writeFileSync(destinationPath, JSON.stringify(bundle));
  });
}
