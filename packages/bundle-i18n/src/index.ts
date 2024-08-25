import { program } from 'commander';
import { bundleLocales, saveLocales } from '@natu/utils/node';
import pc from 'picocolors';

interface Options {
  source: string;
  destination: string;
  filename: string;
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
  .parse();

const root = process.cwd();
const { source, destination, filename } = program.opts<Options>();

try {
  const bundledLocales = bundleLocales({ root, source });
  saveLocales({ bundledLocales, root, destination, filename: `${filename}.json` });

  // eslint-disable-next-line no-console
  console.info(pc.green(`bundle created successfully at "${destination}"`));
} catch (error) {
  // eslint-disable-next-line no-console
  console.error(error);
  // eslint-disable-next-line no-console
  console.error(pc.red('bundle failed to be created'));
}

// TODO: watch mode for Angular
