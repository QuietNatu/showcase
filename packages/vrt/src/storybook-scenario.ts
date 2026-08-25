import type { Page } from '@playwright/test';
import { expect } from '@playwright/test';

import { createTestRunner, expandVrtPlan } from './scenario';
import type {
  VrtPlan,
  VrtPlanSpecification,
  VrtScenario,
  VrtVariantOption,
  VrtViewport,
} from './types';

type StorybookVariantData = { key: string; value: string };

type StorybookVrtScenario<TVariant> = VrtScenario<TVariant> & {
  /** The name of the story. */
  story: string;
  /** Unique identifier when performing multiple tests for the same story. */
  name?: string;
};

export type CreateStorybookVrtPlansOptions<TVariant> = VrtScenario<TVariant> &
  Required<Pick<VrtScenario<TVariant>, 'viewports'>> & {
    /** Name of the page where stories are located. */
    page: string;
    scenarios: StorybookVrtScenario<TVariant>[];
  };

/** Creates test plans to visual regression test storybook stories. */
export function createStorybookVrtPlans<TVariant extends { key: string; value: string }>(
  options: CreateStorybookVrtPlansOptions<TVariant>,
): VrtPlan[] {
  return options.scenarios
    .flatMap((scenario) => expandStorybookVrtPlan(options, scenario))
    .map((scenario) => ({ ...scenario, test: createStorybookTestRunner(scenario) }));
}

/** A single scenario can have several combinations that will translate into multiple test plans */
function expandStorybookVrtPlan<TVariant extends StorybookVariantData>(
  options: CreateStorybookVrtPlansOptions<TVariant>,
  scenario: StorybookVrtScenario<TVariant>,
): VrtPlanSpecification[] {
  return expandVrtPlan(
    {
      createId: createStorybookIdFactory(options.page, scenario.story, scenario.name),
      createUrl: createStorybookUrlFactory(options.page, scenario.story),
      viewports: options.viewports,
      variants: options.variants,
      onMount: options.onMount,
      threshold: options.threshold,
    },
    scenario,
  );
}

function createStorybookIdFactory<TVariant>(
  page: string,
  story: string,
  scenarioName: string | undefined,
) {
  return (viewport: VrtViewport, variantCombination: VrtVariantOption<TVariant>[]) => {
    const variantName = variantCombination.map(({ id }) => id).join('-');

    return [page, story, scenarioName, variantName, viewport.name].filter(Boolean).join('--');
  };
}

function createStorybookUrlFactory<TVariant extends StorybookVariantData>(
  page: string,
  story: string,
) {
  return (_viewport: VrtViewport, variantCombination: VrtVariantOption<TVariant>[]) => {
    const globalsParam = variantCombination
      .map(({ data }) => `${data.key}:${data.value}`)
      .join(';');

    return `iframe.html?args=&viewMode=story&id=${page}--${story}&globals=${globalsParam}`;
  };
}

/**
 * Executes the visual regression tests according to the specified plan.
 *
 * Navigates to the page with the defined settings, produces a screenshot of it and visually compares it.
 * Aditionally, waits for storybook to be fully loaded before perfoming the test.
 */
function createStorybookTestRunner(scenario: VrtPlanSpecification) {
  const onMount = async (page: Page): Promise<void> => {
    await waitForStorybook(page);
    await scenario.onMount?.(page);
  };

  return createTestRunner({ ...scenario, onMount });
}

/** Storybook does not provide a way to wait for the story to be loaded so we have to guess. */
async function waitForStorybook(page: Page) {
  // TODO: optimize?
  await expect(page.locator('#storybook-root')).toHaveCount(1);
  await expect(page.locator('#preview-loader')).toHaveCount(0);
  await page.waitForTimeout(500);
}
