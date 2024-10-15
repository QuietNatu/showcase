const { chromium } = require('playwright-core');

module.exports = {
  ci: {
    collect: {
      chromePath: chromium.executablePath(),
      staticDistDir: 'dist',
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
        'render-blocking-resources': ['error', { maxLength: 3 }],
        'unsized-images': 'off',
        'unused-javascript': 'off',
      },
    },
  },
};
