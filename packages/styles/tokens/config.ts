import StyleDictionary, { Config, TransformedToken } from 'style-dictionary';

const themes = ['ninjask', 'rotom', 'smeargle'];
const colorSchemes = ['light', 'dark'];

const colorSchemeExclusionRegex = `!(*.${colorSchemes.join('|*.')})`;

StyleDictionary.registerTransform({
  name: 'time/miliseconds',
  type: 'value',
  filter: (token) => token.type === 'time',
  transform: (token) => token.original.value.toString() + 'ms',
});

for (const theme of themes) {
  for (let index = 0; index < colorSchemes.length; index++) {
    const colorScheme = colorSchemes[index]!;
    const isMainColorScheme = index === 0;

    const selector = isMainColorScheme
      ? `:root[data-theme='${theme}']`
      : `:root[data-theme='${theme}'][data-color-scheme='${colorScheme}']`;

    const filter = isMainColorScheme
      ? undefined
      : (token: TransformedToken) => token.filePath.endsWith(`.${colorScheme}.json5`);

    const tokenConfig: Partial<Config> = isMainColorScheme
      ? {
          source: [
            `tokens/default/**/${colorSchemeExclusionRegex}.json5`,
            `tokens/themes/${theme}/**/${colorSchemeExclusionRegex}.json5`,
          ],
        }
      : {
          include: [
            `tokens/default/**/${colorSchemeExclusionRegex}.json5`,
            `tokens/themes/${theme}/**/${colorSchemeExclusionRegex}.json5`,
          ],
          source: [
            `tokens/default/**/*.${colorScheme}.json5`,
            `tokens/themes/${theme}/**/*.${colorScheme}.json5`,
          ],
        };

    const config: Config = {
      ...tokenConfig,
      platforms: {
        scss: {
          transforms: ['name/kebab', 'time/miliseconds', 'size/pxToRem'],
          buildPath: `scss/tokens/${theme}/`,
          prefix: 'natu',

          files: [
            {
              destination: `_${colorScheme}.scss`,
              format: `css/variables`,
              filter,
              options: {
                selector,
                outputReferences: true,
              },
            },
          ],
        },
      },
    };

    const styleDictionary = new StyleDictionary(config);
    await styleDictionary.cleanAllPlatforms();
    await styleDictionary.buildAllPlatforms();
  }
}

const relevantTsCategories = new Set(['time']);
const tsConfig: Config = {
  source: [`tokens/default/**/${colorSchemeExclusionRegex}.json5`],
  platforms: {
    ts: {
      transforms: ['name/constant'],
      buildPath: `ts/tokens/`,
      prefix: 'natu',
      files: [
        {
          destination: 'index.js',
          format: 'javascript/es6',
          filter: (token) => token.type && relevantTsCategories.has(token.type),
        },
        {
          destination: 'index.d.ts',
          format: 'typescript/es6-declarations',
          filter: (token) => token.type && relevantTsCategories.has(token.type),
        },
      ],
    },
  },
};

const styleDictionary = new StyleDictionary(tsConfig);
await styleDictionary.cleanAllPlatforms();
await styleDictionary.buildAllPlatforms();
