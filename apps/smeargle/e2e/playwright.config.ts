import { devices, type PlaywrightTestConfig } from '@playwright/test';
import { defineBddConfig, cucumberReporter } from 'playwright-bdd';

const port = process.env.PORT ? Number(process.env.PORT) : 6005;
const isCi = process.env.CI && process.env.CI !== '0';

const testDir = defineBddConfig({
  features: 'src/features/**/*.feature',
  steps: 'src/steps/**/*.ts',
});

export default {
  testDir,
  outputDir: 'results',
  forbidOnly: !!isCi,
  retries: isCi ? 2 : 0,
  maxFailures: 0,
  reporter: [
    ['list'],
    cucumberReporter('html', { outputFile: 'report/index.html', externalAttachments: true }),
  ],
  use: {
    baseURL: `http://localhost:${port}/`,
    headless: true,
    locale: 'en-GB',
    screenshot: 'on',
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
