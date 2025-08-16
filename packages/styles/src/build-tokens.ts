/* eslint-disable no-console */
import StyleDictionary, { Config } from 'style-dictionary';
import { formats, transforms } from 'style-dictionary/enums';
import pc from 'picocolors';

const prefix = 'natu';
const themes = ['rotom', 'rotom-dark', 'smeargle', 'smeargle-dark'];

function createThemeConfig(theme: string): Config {
  return {
    source: [`src/tokens/themes/${theme}/*.json`, 'src/tokens/globals/**/*.json'],
    platforms: {
      web: {
        prefix,
        transforms: [transforms.nameKebab, transforms.timeSeconds, transforms.sizePxToRem],
        buildPath: 'dist/tokens/',
        files: [
          {
            destination: `_${theme}.scss`,
            format: formats.cssVariables,
            options: {
              formatting: {
                fileHeaderTimestamp: true,
              },
              outputReferences: true,
              selector: `[data-theme='${theme}']`,
            },
          },
        ],
      },
    },
  };
}

async function buildStyleSheets(config: Config) {
  const styleDictionary = new StyleDictionary(config);

  await styleDictionary.cleanAllPlatforms();
  await styleDictionary.buildAllPlatforms();
}

async function buildAllStyleSheets() {
  console.log('Build started...');

  // eslint-disable-next-line functional/no-loop-statements
  for (const theme of themes) {
    console.log('\n==============================================');
    console.log(`\nProcessing: [${theme}]`);

    await buildStyleSheets(createThemeConfig(theme));
  }

  console.log('\n==============================================');
  console.log(pc.green('\nBuild completed!'));
}

void buildAllStyleSheets();
