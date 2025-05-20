const prettier =
  'prettier --write --config ../../prettier.config.js --ignore-path=../../.prettierignore --ignore-path=../../.gitignore';

export default {
  '*': 'ls-lint --config ../../.ls-lint.yml',
  '*.{css,scss}': ['stylelint --fix --config ../../stylelint.config.js', prettier],
  '*.{js,jsx,ts,tsx,html}': [
    'eslint --cache --fix --report-unused-disable-directives --no-warn-ignored --max-warnings 0',
    prettier,
  ],
  '!(*.{css,scss,js,jsx,ts,tsx,html})': prettier,
};
