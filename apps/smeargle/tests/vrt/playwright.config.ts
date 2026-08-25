import { defineConfig, devices } from '@playwright/test';

// TODO: port
const port = Number.parseInt(process.env.PORT ?? '6004');
const reportPort = 6005;
const isCi = process.env.CI && process.env.CI !== '0';

export default defineConfig({
  testDir: '../../src',
  testMatch: '**/*.vrt.ts',
  snapshotPathTemplate: '{testDir}/{testFileDir}/__screenshots__/{arg}{ext}',
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
  },
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        launchOptions: {
          args: [
            '--font-render-hinting=none',
            '--disable-skia-runtime-opts',
            '--disable-font-subpixel-positioning',
            '--disable-lcd-text',
          ],
        },
      },
    },
  ],
  webServer: {
    command: `pnpm storybook:preview --port ${port}`,
    port,
    reuseExistingServer: !isCi,
  },
});
