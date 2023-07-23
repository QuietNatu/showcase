/* eslint-env node */

module.exports = {
  root: true,
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: './tsconfig.json',
    createDefaultProgram: true,
  },
  extends: ['@natu/eslint-config-angular'],
  rules: {
    '@angular-eslint/component-selector': [
      'error',
      {
        prefix: ['natu'],
        style: 'kebab-case',
        type: ['attribute', 'element'],
      },
    ],
    '@angular-eslint/directive-selector': [
      'error',
      {
        prefix: ['natu'],
        style: 'camelCase',
        type: ['attribute', 'element'],
      },
    ],
  },
};
