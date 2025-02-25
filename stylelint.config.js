/** @type {import("stylelint").Config} */
export default {
  extends: ['stylelint-config-standard-scss', 'stylelint-config-css-modules'],
  plugins: ['stylelint-scss', 'stylelint-order'],
  ignoreFiles: ['./node_modules/**', '**/*.js', '**/*.ts', '**/*.jsx', '**/*.tsx'],
  rules: {
    'alpha-value-notation': 'number',
    'color-function-notation': null,
    'custom-property-empty-line-before': [
      'always',
      { except: ['first-nested', 'after-comment', 'after-custom-property'] },
    ],
    'at-rule-no-unknown': null,
    'custom-property-pattern': null,
    'number-max-precision': null,
    'selector-class-pattern': null,
    'scss/at-mixin-pattern': null,
    'scss/dollar-variable-empty-line-before': null,
    'scss/function-no-unknown': null,
    'order/properties-alphabetical-order': true,
  },
};
