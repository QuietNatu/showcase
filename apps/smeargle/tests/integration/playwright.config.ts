import { defineConfig, devices } from '@playwright/test';
import { AppRequestHeader } from '../../src/shared/config/headers';
import { Scenario } from './src/configs/scenarios';

const port = Number.parseInt(process.env.PORT ?? '6004');
const mockServerPort = 6006;
const reportPort = 6005;
const isCi = process.env.CI && process.env.CI !== '0';

export default defineConfig({
  testDir: 'src/tests',
  outputDir: 'results',
  forbidOnly: Boolean(isCi),
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
    extraHTTPHeaders: {
      [AppRequestHeader.TestScenarios]: Scenario.Default,
    },
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  webServer: [
    {
      command: 'pnpm test:integration:start-mocks',
      env: {
        PORT: mockServerPort.toString(),
      },
      port: mockServerPort,
      reuseExistingServer: !isCi,
    },
    {
      command: 'pnpm start',
      env: {
        PORT: port.toString(),
        TEST_API_BASE_URL: `http://localhost:${mockServerPort}/`,
      },
      port,
      reuseExistingServer: !isCi,
    },
  ],
});
