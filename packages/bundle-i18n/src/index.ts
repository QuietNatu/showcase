/* eslint-disable no-console */

import { program } from 'commander';
import { bundleLocales, saveLocales } from '@natu/utils/node';
import pc from 'picocolors';
import watcher from '@parcel/watcher';
import path from 'path';

interface Options {
  source: string;
  destination: string;
  filename: string;
  watch?: boolean;
}

program
  .description(
    `Bundles i18n translations files into a single file.
  This is to avoid having multiple translation files
  in production and having to perform a HTTP request
  for each of them.`,
  )
  .requiredOption('--source <source>', 'source dir of translations')
  .requiredOption('--destination <destination>', 'destination dir of bundled translations')
  .requiredOption('--filename <filename>', 'name of the bundled file')
  .option('--watch', 'watch for changes in source dir')
  .parse();

const root = process.cwd();
const { source, destination, filename, watch } = program.opts<Options>();

function bundleI18n() {
  try {
    const bundledLocales = bundleLocales({ root, source });
    saveLocales({ bundledLocales, root, destination, filename: `${filename}.json` });

    console.info(pc.green(`bundle created successfully at "${destination}"`));
  } catch (error) {
    console.error(error);
    console.error(pc.red('bundle failed to be created'));
  }
}

bundleI18n();

if (watch) {
  void watcher.subscribe(path.resolve(root, source), (error, _events) => {
    if (error) {
      console.error(error);
      console.error(pc.red('error while watching for bundle changes'));
    } else {
      bundleI18n();
    }
  });
}
