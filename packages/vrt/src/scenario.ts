import { Page, TestInfo, expect } from '@playwright/test';
import { VrtScenario, VrtScenarioOptions, VrtViewport } from './types';

interface Options extends VrtScenarioOptions {
  scenarios: VrtScenario[];
  /**
   * Name of the page where stories are located.
   */
  page: string;
  viewports: VrtViewport[];
}

interface TestScenario extends VrtScenarioOptions {
  id: string;
  url: string;
  viewport: Pick<VrtViewport, 'height' | 'width'>;
}

interface VrtStorybookScenario extends TestScenario {
  test: (page: Page, testInfo: TestInfo) => Promise<void>;
}

/**
 * Creates test scenarios for visual regression testing storybook stories.
 */
export function createVrtStorybookScenarios(options: Options): VrtStorybookScenario[] {
  return options.scenarios
    .flatMap((scenario) => createTestScenario(options, scenario))
    .map((scenario) => ({ ...scenario, test: createTestRunner(scenario) }));
}

function createTestScenario(
  options: Options,
  scenario: VrtScenario,
): TestScenario | TestScenario[] {
  const url = `iframe.html?args=&viewMode=story&id=${options.page}--${scenario.story}`;
  const viewports = scenario.viewports ?? options.viewports;

  return viewports.map(({ name, ...viewport }) => {
    const id = `${options.page}--${scenario.story}--${name}`;

    return { ...options, ...scenario, id, url, viewport };
  });
}

function createTestRunner(scenario: TestScenario) {
  return async (page: Page, testInfo: TestInfo): Promise<void> => {
    await page.setViewportSize(scenario.viewport);
    await page.goto(scenario.url, { waitUntil: 'networkidle' });

    await makeSurePageIsReady(page);
    await scenario.onMount?.(page);

    const screenshot = await page.screenshot({ animations: 'disabled' });
    expect(screenshot).toMatchSnapshot({ threshold: scenario.threshold });

    await testInfo.attach('screenshot', { body: screenshot, contentType: 'image/png' });
  };
}

/**
 * Storybook does not provide a way to wait for the story to be loaded so we have to guess.
 */
async function makeSurePageIsReady(page: Page) {
  await expect(page.locator('storybook-root')).toHaveCount(1);
  await expect(page.locator('#preview-loader')).toHaveCount(0);
  await page.waitForTimeout(500);
}
