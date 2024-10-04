const { chromium } = require('playwright-core');

module.exports = {
  ci: {
    collect: {
      chromePath: chromium.executablePath(),
      startServerCommand: 'pnpm preview',
      startServerReadyPattern: 'Local',
      startServerReadyTimeout: 20_000,
      url: ['http://localhost:6009/'],
    },
    upload: {
      target: 'temporary-public-storage',
    },
  },
};
