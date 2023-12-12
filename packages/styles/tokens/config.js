import StyleDictionary from 'style-dictionary';

const { fileHeader, formattedVariables } = StyleDictionary.formatHelpers;
const themes = ['ninjask', 'rotom', 'smeargle'];

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
  const config = getStyleDictionaryConfig(theme);
  const sd = new StyleDictionary(config);
  await sd.buildAllPlatforms();
}

function getStyleDictionaryConfig(theme) {
  const themeSelector = `:root[data-theme='${theme}']`;

  return {
    source: [`tokens/themes/${theme}/*.json5`, 'tokens/default/**/*.json5'],
    platforms: {
      scss: {
        transforms: ['attribute/cti', 'name/cti/kebab'],
        buildPath: `scss/tokens/${theme}/`,
        prefix: 'natu',
        files: [
          {
            destination: '_light.scss',
            format: 'css/variables-themed',
            options: {
              outputReferences: true,
              selector: themeSelector,
            },
          },
          {
            destination: '_dark.scss',
            format: 'css/variables-themed',
            filter: (token) => token.attributes.theme === 'dark',
            options: {
              outputReferences: true,
              selector: `${themeSelector}[data-color-scheme='dark']`,
            },
          },
        ],
      },
    },
  };
}
