/** @type {import("stylelint").Config} */
export default {
  plugins: [
    'stylelint-scss',
    'stylelint-order',
    'stylelint-declaration-block-no-ignored-properties',
    'stylelint-plugin-logical-css',
    'stylelint-no-unsupported-browser-features',
    'stylelint-gamut',
  ],
  extends: [
    'stylelint-config-standard-scss',
    'stylelint-config-css-modules',
    'stylelint-plugin-logical-css/configs/recommended',
  ],
  ignoreFiles: ['**/node_modules/**', '**/dist/**', '**/*.js', '**/*.ts', '**/*.jsx', '**/*.tsx'],
  rules: {
    'alpha-value-notation': 'number',
    'color-no-hex': true,
    'custom-property-empty-line-before': [
      'always',
      { except: ['first-nested', 'after-comment', 'after-custom-property'] },
    ],
    'function-disallowed-list': ['rgba', 'hsla', 'rgb', 'hsl'],
    'gamut/color-no-out-gamut-range': true,
    'hue-degree-notation': 'number',
    'lightness-notation': 'number',
    'order/properties-alphabetical-order': true,
    'plugin/declaration-block-no-ignored-properties': true,
    'plugin/no-unsupported-browser-features': [true, { ignore: ['css-nesting', 'css-when-else'] }],
    'scss/double-slash-comment-empty-line-before': null,
    'value-keyword-case': ['lower', { ignoreProperties: ['/--natu-font-family-.+/'] }],
  },
};
