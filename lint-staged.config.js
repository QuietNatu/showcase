export default {
  '*': 'ls-lint',
  '*.{css,scss}': ['stylelint --fix', 'prettier --write'],
  '!(*.{css,scss})': 'prettier --write',
};
