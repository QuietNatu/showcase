import type { Page, TestInfo } from '@playwright/test';
import { expect } from '@playwright/test';

import type { VrtPlanSpecification, VrtScenario, VrtVariantOption, VrtViewport } from './types';

type ExpandVrtPlanOptions<TVariant> = Required<Pick<VrtScenario<TVariant>, 'viewports'>> &
  Pick<VrtScenario<TVariant>, 'onMount' | 'threshold' | 'variants'> & {
    /** Creates a unique ID for the test plan */
    createId: (viewport: VrtViewport, variantCombination: VrtVariantOption<TVariant>[]) => string;
    /** Creates the url for the page to be tested */
    createUrl: (viewport: VrtViewport, variantCombination: VrtVariantOption<TVariant>[]) => string;
  };

/** A single scenario can have several combinations that will translate into multiple test plans */
export function expandVrtPlan<TVariant>(
  options: ExpandVrtPlanOptions<TVariant>,
  scenario: VrtScenario<TVariant>,
): VrtPlanSpecification[] {
  const { createId, createUrl, onMount, threshold } = options;
  const variants = scenario.variants ?? options.variants ?? [];
  const viewports = scenario.viewports ?? options.viewports;

  const variantCombinations = variants.length
    ? variants.reduce<VrtVariantOption<TVariant>[][]>(
        (combinations, variant) =>
          combinations.flatMap((combination) =>
            variant.options.map((option) => combination.concat(option)),
          ),
        [[]],
      )
    : [[]];

  return variantCombinations.flatMap((variantCombination) =>
    viewports.map((viewport) => ({
      id: createId(viewport, variantCombination),
      url: createUrl(viewport, variantCombination),
      viewport: { height: viewport.height, width: viewport.width },
      onMount,
      threshold,
    })),
  );
}

/**
 * Executes the visual regression tests according to the specified plan.
 *
 * Navigates to the page with the defined settings, produces a screenshot of it and visually compares it.
 */
export function createTestRunner(scenario: VrtPlanSpecification) {
  return async (page: Page, _testInfo: TestInfo): Promise<void> => {
    await page.setViewportSize(scenario.viewport);
    await page.goto(scenario.url);

    await scenario.onMount?.(page);

    await expect(page).toHaveScreenshot({ animations: 'disabled', threshold: scenario.threshold });
  };
}
