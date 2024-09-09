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

function createTestScenario(options: Options, scenario: VrtScenario): TestScenario[] {
  const viewports = scenario.viewports ?? options.viewports;
  const variants = createVariants(scenario.variants ?? options.variants ?? []);
  const baseUrl = `iframe.html?args=&viewMode=story&id=${options.page}--${scenario.story}`;

  if (!variants.length) {
    return createViewportScenarios(options, scenario, viewports, baseUrl);
  }

  return variants.flatMap((variant) => {
    const url = `${baseUrl}&globals=${variant.url}`;
    return createViewportScenarios(options, scenario, viewports, url, variant.fileName);
  });
}

function createTestRunner(scenario: TestScenario) {
  return async (page: Page, _testInfo: TestInfo): Promise<void> => {
    await page.setViewportSize(scenario.viewport);
    await page.goto(scenario.url, { waitUntil: 'networkidle' });

    await makeSurePageIsReady(page);
    await scenario.onMount?.(page);

    const screenshot = await page.screenshot({ animations: 'disabled' });
    // Conflict between playwright types and typescript version if unknown can be removed in the future
    expect(screenshot as unknown).toMatchSnapshot({ threshold: scenario.threshold });
  };
}

/**
 * Storybook does not provide a way to wait for the story to be loaded so we have to guess.
 */
async function makeSurePageIsReady(page: Page) {
  await expect(page.locator('#storybook-root')).toHaveCount(1);
  await expect(page.locator('#preview-loader')).toHaveCount(0);
  await page.waitForTimeout(500);
}

function createVariants(variants: Record<string, unknown>[]) {
  return variants.map((variant) => {
    const url = Object.entries(variant)
      .map((entry) => entry.join(':'))
      .join(';');

    const fileName = Object.values(variant).join('-');

    return { url, fileName };
  });
}

function createViewportScenarios(
  options: Options,
  scenario: VrtScenario,
  viewports: VrtViewport[],
  url: string,
  variant?: string,
) {
  return viewports.map(({ name, ...viewport }) => {
    const id = [options.page, scenario.story, scenario.name, variant, name]
      .filter(Boolean)
      .join('--');

    return { ...options, ...scenario, id, url, viewport };
  });
}
