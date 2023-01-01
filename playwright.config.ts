/* eslint-disable import/no-default-export */
import type { PlaywrightTestConfig } from '@playwright/test';
import { devices } from '@playwright/test';
import 'dotenv/config';

const port = process.env.PORT ? Number(process.env.PORT) : 5173;

const config: PlaywrightTestConfig = {
  testDir: 'e2e/tests',
  outputDir: 'e2e/results',
  forbidOnly: !!process.env.CI,
  reporter: [['list']],
  use: {
    baseURL: `http://127.0.0.1:${port}/`,
    headless: true,
    locale: 'en-GB',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'retain-on-failure',
  },
  webServer: {
    command: process.env.CI ? `npm run preview -- --port ${port}` : `npm run dev -- --port ${port}`,
    port,
    reuseExistingServer: !process.env.CI,
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
      name: 'webKit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
};

export default config;
