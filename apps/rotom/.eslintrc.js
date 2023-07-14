/* eslint-env node */

module.exports = {
  root: true,
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: './tsconfig.json',
    createDefaultProgram: true,
  },
  extends: ['@natu/eslint-config-angular'],
};
