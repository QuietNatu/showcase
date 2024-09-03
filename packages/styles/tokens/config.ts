import StyleDictionary, { Config } from 'style-dictionary';
import { fileHeader, formattedVariables } from 'style-dictionary/utils';

const themes = ['ninjask', 'rotom', 'smeargle'];
const colorSchemes = ['light', 'dark'];

/* TODO: https://styledictionary.com/version-4/migration/ */
/* TODO: https://github.com/amzn/style-dictionary/blob/main/examples/advanced/multi-brand-multi-platform/build.js */

StyleDictionary.registerFormat({
  name: 'css/variables-themed',
  format: async ({ dictionary, file, options }) => {
    const { outputReferences, selector } = options;

    const header = await fileHeader({ file });
    const variables = formattedVariables({
      format: 'css',
      dictionary,
      outputReferences,
    });

    return `${header}${selector} {\n${variables}\n}\n`;
  },
});

StyleDictionary.registerTransform({
  name: 'time/miliseconds',
  type: 'value',
  filter: (token) => token.attributes.category === 'time',
  transform: (token) => token.original.value.toString() + 'ms',
});

for (const theme of themes) {
  const selector = `:root[data-theme='${theme}']`;

  const lightConfig: Config = {
    source: [
      `tokens/default/**/!(*.${colorSchemes.join(`|*.`)}).json5`,
      `tokens/themes/${theme}/**/!(*.${colorSchemes.join(`|*.`)}).json5`,
    ],
    platforms: {
      scss: {
        transforms: ['name/kebab', 'time/miliseconds', 'size/pxToRem'],
        buildPath: `scss/tokens/${theme}/`,
        prefix: 'natu',
        files: [
          {
            destination: `_light.scss`,
            format: `css/variables-themed`,
            options: {
              outputReferences: true,
              selector,
            },
          },
        ],
      },
    },
  };

  const darkConfig: Config = {
    include: [
      `tokens/default/**/!(*.${colorSchemes.join(`|*.`)}).json5`,
      `tokens/themes/${theme}/**/!(*.${colorSchemes.join(`|*.`)}).json5`,
    ],
    source: [`tokens/default/**/*.dark.json5`, `tokens/themes/${theme}/**/*.dark.json5`],
    platforms: {
      scss: {
        transforms: ['name/kebab', 'time/miliseconds'],
        buildPath: `scss/tokens/${theme}/`,
        prefix: 'natu',
        files: [
          {
            destination: `_dark.scss`,
            format: `css/variables-themed`,
            filter: (token) => token.filePath.indexOf(`.dark`) !== -1,
            options: {
              outputReferences: true,
              selector: `${selector}[data-color-scheme='dark']`,
            },
          },
        ],
      },
    },
  };

  const lightSd = new StyleDictionary(lightConfig);
  await lightSd.cleanAllPlatforms();
  await lightSd.buildAllPlatforms();

  const darkSd = new StyleDictionary(darkConfig);
  await darkSd.cleanAllPlatforms();
  await darkSd.buildAllPlatforms();
}

const relevantTsCategories = new Set(['time']);
const tsConfig: Config = {
  source: [`tokens/default/**/!(*.${colorSchemes.join(`|*.`)}).json5`],
  platforms: {
    ts: {
      transforms: ['name/constant'],
      buildPath: `ts/tokens/`,
      prefix: 'natu',
      files: [
        {
          destination: 'index.js',
          format: 'javascript/es6',
          filter: (token) => relevantTsCategories.has(token.attributes.category),
        },
        {
          destination: 'index.d.ts',
          format: 'typescript/es6-declarations',
          filter: (token) => relevantTsCategories.has(token.attributes.category),
        },
      ],
    },
  },
};

await new StyleDictionary(tsConfig).buildAllPlatforms();
