/** @type {import("lint-staged").Config} */
export default {
  '{apps,packages}/*/{src,e2e,vrt}/**/*': 'ls-lint',
  '{apps,packages}/*/{src,e2e,vrt}/**/*.{js,jsx,ts,tsx}':
    'eslint --cache --fix --report-unused-disable-directives --max-warnings 0',
  '{apps,packages}/*/src/**/*.{css,scss}': 'stylelint --fix',
  '{apps,packages}/**/*.{js,jsx,ts,tsx,json,css,scss,md}': 'prettier --write',
};
