import { devices, type PlaywrightTestConfig } from '@playwright/test';

const port = process.env['PORT'] ? Number(process.env['PORT']) : 6213;
const isCi = process.env['CI'] && process.env['CI'] !== '0';

export default {
  testMatch: /.*\.vrt\.ts/,
  testDir: '../src',
  outputDir: 'results',
  snapshotDir: 'screenshots',
  snapshotPathTemplate: '{snapshotDir}/{testFilePath}/{arg}{ext}',
  forbidOnly: !!isCi,
  retries: isCi ? 2 : 0,
  maxFailures: 0,
  reporter: [['list'], ['html', { outputFolder: 'report', port: '6214' }]],
  use: {
    baseURL: `http://localhost:${port}/`,
    headless: true,
    locale: 'en-GB',
    screenshot: 'off',
    video: 'off',
    trace: 'off',
  },
  webServer: {
    command: `pnpm preview-storybook --port ${port}`,
    port,
    reuseExistingServer: !isCi,
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
} satisfies PlaywrightTestConfig;
