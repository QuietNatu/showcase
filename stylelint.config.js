/** @type {import("stylelint").Config} */
export default {
  extends: ['stylelint-config-standard-scss', 'stylelint-config-css-modules'],
  plugins: [
    'stylelint-scss',
    'stylelint-order',
    'stylelint-declaration-block-no-ignored-properties',
    'stylelint-plugin-logical-css',
    'stylelint-no-unsupported-browser-features',
    'stylelint-gamut',
  ],
  ignoreFiles: ['./node_modules/**', '**/*.js', '**/*.ts', '**/*.jsx', '**/*.tsx'],
  rules: {
    'alpha-value-notation': 'number',
    'color-no-hex': true,
    'custom-property-empty-line-before': [
      'always',
      { except: ['first-nested', 'after-comment', 'after-custom-property'] },
    ],
    'function-disallowed-list': ['rgba', 'hsla', 'rgb', 'hsl'],
    'gamut/color-no-out-gamut-range': true,
    'order/properties-alphabetical-order': true,
    'plugin/declaration-block-no-ignored-properties': true,
    'plugin/no-unsupported-browser-features': [true, { ignore: ['css-nesting', 'css-when-else'] }],
    'plugin/use-logical-properties-and-values': true,
    'plugin/use-logical-units': true,
    'value-keyword-case': ['lower', { ignoreProperties: ['/--natu-font-family-.+/'] }],
  },
};
