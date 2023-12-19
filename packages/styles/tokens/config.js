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

for (const theme of themes) {
  const selector = `:root[data-theme='${theme}']`;

  const lightConfig = {
    source: [
      `tokens/default/**/!(*.${colorSchemes.join(`|*.`)}).json5`,
      `tokens/themes/${theme}/**/!(*.${colorSchemes.join(`|*.`)}).json5`,
    ],
    platforms: {
      scss: {
        transforms: ['attribute/cti', 'name/cti/kebab'],
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
        transforms: ['attribute/cti', 'name/cti/kebab'],
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
