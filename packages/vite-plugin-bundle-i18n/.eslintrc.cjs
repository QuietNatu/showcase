/* eslint-env node */

module.exports = {
  root: true,
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: './tsconfig.json',
  },
  extends: ['@natu/eslint-config-react'],
  rules: {
    '@typescript-eslint/no-non-null-assertion': 'off',
    'functional/immutable-data': 'off',
    'functional/no-let': 'off',
  },
};
