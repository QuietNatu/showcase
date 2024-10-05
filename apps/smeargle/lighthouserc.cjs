const { chromium } = require('playwright-core');

module.exports = {
  ci: {
    collect: {
      chromePath: chromium.executablePath(),
      staticDistDir: 'dist',
      isSinglePageApplication: true,
      url: ['http://localhost:6009/'],
    },
    upload: {
      target: 'filesystem',
      outputDir: 'lighthouse-reports/mobile',
    },
  },
};
