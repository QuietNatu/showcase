/* eslint-disable no-console */
import StyleDictionary, { Config } from 'style-dictionary';
import { formats, transforms, actions } from 'style-dictionary/enums';
import pc from 'picocolors';

const themes = ['rotom', 'rotom-dark', 'smeargle', 'smeargle-dark'];

function createThemeConfig(theme: string): Config {
  return {
    source: [`tokens/themes/${theme}/*.json`, 'tokens/globals/**/*.json'],
    platforms: {
      web: {
        transforms: [transforms.nameKebab, transforms.timeSeconds, transforms.sizePxToRem],
        buildPath: 'dist/tokens/',
        files: [
          {
            destination: `${theme}.scss`,
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

async function buildTokens(config: Config) {
  const styleDictionary = new StyleDictionary(config);

  await styleDictionary.cleanAllPlatforms();
  await styleDictionary.buildAllPlatforms();
}

async function buildAllTokens() {
  console.log('Build started...');

  // eslint-disable-next-line functional/no-loop-statements
  for (const theme of themes) {
    console.log('\n==============================================');
    console.log(`\nProcessing: [${theme}]`);

    await buildTokens(createThemeConfig(theme));
  }

  // TODO: custom format,
  await buildTokens({
    source: ['tokens/globals/asset.json'],
    platforms: {
      'font-face': {
        buildPath: 'dist/tokens/',
        files: [
          {
            destination: 'fonts.css',
            format: ({ dictionary: { allTokens }, options }) => {
              const fontPathPrefix = options.fontPathPrefix || '../';

              // https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face/src
              const formatsMap = {
                woff2: 'woff2',
                woff: 'woff',
                ttf: 'truetype',
                otf: 'opentype',
                svg: 'svg',
                eot: 'embedded-opentype',
              };

              return allTokens
                .reduce((fontList, prop) => {
                  const {
                    attributes: { family, weight, style },
                    formats,
                    value: path,
                  } = prop;

                  const urls = formats.map(
                    (extension) =>
                      `url("${fontPathPrefix}${path}.${extension}") format("${formatsMap[extension]}")`,
                  );

                  const fontCss = [
                    '@font-face {',
                    `\n\tfont-family: "${family}";`,
                    `\n\tfont-style: ${style};`,
                    `\n\tfont-weight: ${weight};`,
                    `\n\tsrc: ${urls.join(',\n\t\t\t ')};`,
                    '\n\tfont-display: fallback;',
                    '\n}\n',
                  ].join('');

                  fontList.push(fontCss);

                  return fontList;
                }, [])
                .join('\n');
            },
            options: {
              fontPathPrefix: '../',
              formatting: {
                fileHeaderTimestamp: true,
              },
            },
          },
        ],
        actions: [actions.copyAssets], // TODO: custom copy instead of this?
      },
    },
  });

  console.log('\n==============================================');
  console.log(pc.green('\nBuild completed!'));
}

void buildAllTokens();
