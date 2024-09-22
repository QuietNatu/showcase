// TODO: remove child repos and enable eslint once https://github.com/eslint/eslint/issues/18385 is closed.

export default {
  '*': 'ls-lint',
  '*.{css,scss}': ['stylelint --fix', 'prettier --write'],
  '*.{js,jsx,ts,tsx}': [
    // 'eslint --cache --fix --report-unused-disable-directives --no-warn-ignored --max-warnings 0',
    'prettier --write',
  ],
  '*.{json,css,scss,md}': 'prettier --write',
};
