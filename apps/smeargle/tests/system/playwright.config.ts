import { defineConfig, devices } from '@playwright/test';

// TODO: port numbers
const port = 6003;
const reportPort = 6004;
const isCi = process.env.CI && process.env.CI !== '0';

export default defineConfig({
  testDir: 'src',
  outputDir: 'results',
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
  webServer: {
    command: `pnpm start --port ${port}`,
    port,
    reuseExistingServer: !isCi,
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
