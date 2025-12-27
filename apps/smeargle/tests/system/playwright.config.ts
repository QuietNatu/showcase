import { defineConfig, devices } from '@playwright/test';
import { getAppPort } from './src/utils/config';

const port = getAppPort();
const reportPort = 6005;
const isCi = process.env.CI && process.env.CI !== '0';

export default defineConfig({
  testDir: 'src',
  outputDir: 'results',
  globalSetup: './global-setup.ts',
  globalTeardown: './global-teardown.ts',
  forbidOnly: !!isCi,
  retries: 0,
  maxFailures: 0,
  workers: isCi ? 1 : undefined,
  reporter: [['list'], ['html', { outputFolder: 'report', port: reportPort }]],
  use: {
    baseURL: `http://localhost:${port}/`,
    headless: true,
    locale: 'en-GB',
    screenshot: 'off',
    video: 'retain-on-failure',
    trace: 'retain-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
