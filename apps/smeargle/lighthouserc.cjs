const { chromium } = require('playwright-core');

module.exports = {
  ci: {
    collect: {
      chromePath: chromium.executablePath(),
      staticDistDir: 'dist',
      isSinglePageApplication: true,
      url: ['http://localhost/'],
    },
    upload: {
      target: 'filesystem',
      outputDir: 'lighthouse-reports/mobile',
    },
    assert: {
      preset: 'lighthouse:recommended',
      assertions: {
        'render-blocking-resources': ['error', { maxLength: 2 }],
        'unsized-images': 'off',
        'unused-javascript': 'off',
      },
    },
  },
};
