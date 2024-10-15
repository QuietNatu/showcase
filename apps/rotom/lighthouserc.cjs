const { chromium } = require('playwright-core');

module.exports = {
  ci: {
    collect: {
      chromePath: chromium.executablePath(),
      staticDistDir: 'dist/browser',
      isSinglePageApplication: true,
      url: ['http://localhost/'],
      settings: {
        chromeFlags: '--no-sandbox',
      },
    },
    upload: {
      target: 'filesystem',
      outputDir: 'lighthouse-reports/mobile',
    },
    assert: {
      preset: 'lighthouse:recommended',
      assertions: {
        'unsized-images': 'off',
        'unused-javascript': 'off',
      },
    },
  },
};
