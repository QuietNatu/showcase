/* eslint-env node */

module.exports = {
  root: true,
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: './tsconfig.json',
  },
  extends: ['@natu/eslint-config-react'],
  rules: {},
};
