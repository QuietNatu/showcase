import { devices, type PlaywrightTestConfig } from '@playwright/test';

const port = process.env.PORT ? Number(process.env.PORT) : 6005;
const isCi = process.env.CI && process.env.CI !== '0';

export default {
  // eslint-disable-next-line sonarjs/slow-regex
  testMatch: /.*\.test\.ts/,
  testDir: './tests',
  outputDir: 'results',
  forbidOnly: !!isCi,
  retries: isCi ? 2 : 0,
  maxFailures: 0,
  reporter: [['list'], ['html', { outputFolder: 'report', port: '6005' }]],
  use: {
    baseURL: `http://localhost:${port}/`,
    headless: true,
    locale: 'en-GB',
    screenshot: 'only-on-failure',
    video: 'on-first-retry',
    trace: 'on-first-retry',
  },
  webServer: {
    command: isCi ? `pnpm run preview --port ${port}` : `pnpm run dev --port ${port}`,
    port,
    reuseExistingServer: !isCi,
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
} satisfies PlaywrightTestConfig;
