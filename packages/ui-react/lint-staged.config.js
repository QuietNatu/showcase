export default {
  '*': 'ls-lint --config ../../.ls-lint.yml',
  '*.{css,scss}': [
    'stylelint --fix --config ../../stylelint.config.js',
    'prettier --write --config ../../prettier.config.js',
  ],
  '*.{js,jsx,ts,tsx}': [
    'eslint --cache --fix --report-unused-disable-directives --no-warn-ignored --max-warnings 0',
    'prettier --write --config ../../prettier.config.js',
  ],
  '*.{json,css,scss,md}': 'prettier --write --config ../../prettier.config.js',
};
