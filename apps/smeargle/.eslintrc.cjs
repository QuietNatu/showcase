/* eslint-env node */

module.exports = {
  root: true,
  extends: ['@natu/eslint-config-react'],
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: './tsconfig.json',
  },
};
