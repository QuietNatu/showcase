import StyleDictionary from 'style-dictionary';

const { fileHeader, formattedVariables } = StyleDictionary.formatHelpers;
const themes = ['ninjask', 'rotom', 'smeargle'];
const colorSchemes = ['light', 'dark'];

StyleDictionary.registerFormat({
  name: 'css/variables-themed',
  formatter: ({ dictionary, file, options }) => {
    const { outputReferences, selector } = options;

    const header = fileHeader({ file });
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
  matcher: (token) => token.attributes.category === 'time',
  transformer: (token) => token.original.value.toString() + 'ms',
});

for (const theme of themes) {
  const selector = `:root[data-theme='${theme}']`;

  const lightConfig = {
    source: [
      `tokens/default/**/!(*.${colorSchemes.join(`|*.`)}).json5`,
      `tokens/themes/${theme}/**/!(*.${colorSchemes.join(`|*.`)}).json5`,
    ],
    platforms: {
      scss: {
        transforms: ['attribute/cti', 'name/cti/kebab', 'time/miliseconds'],
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

  const darkConfig = {
    include: [
      `tokens/default/**/!(*.${colorSchemes.join(`|*.`)}).json5`,
      `tokens/themes/${theme}/**/!(*.${colorSchemes.join(`|*.`)}).json5`,
    ],
    source: [`tokens/default/**/*.dark.json5`, `tokens/themes/${theme}/**/*.dark.json5`],
    platforms: {
      scss: {
        transforms: ['attribute/cti', 'name/cti/kebab', 'time/miliseconds'],
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

  await new StyleDictionary(lightConfig).buildAllPlatforms();
  await new StyleDictionary(darkConfig).buildAllPlatforms();
}

const relevantTsCategories = new Set(['time']);
const tsConfig = {
  include: [`tokens/themes/smeargle/**/!(*.${colorSchemes.join(`|*.`)}).json5`], // TODO have default have all tokens so we can remove this
  source: [`tokens/default/**/!(*.${colorSchemes.join(`|*.`)}).json5`],
  platforms: {
    ts: {
      transforms: ['attribute/cti', 'name/cti/constant'],
      buildPath: `ts/tokens/`,
      prefix: 'natu',
      files: [
        {
          destination: 'tokens.js',
          format: 'javascript/es6',
          filter: (token) => relevantTsCategories.has(token.attributes.category),
        },
        {
          destination: 'tokens.d.ts',
          format: 'typescript/es6-declarations',
          filter: (token) => relevantTsCategories.has(token.attributes.category),
        },
      ],
    },
  },
};

await new StyleDictionary(tsConfig).buildAllPlatforms();
