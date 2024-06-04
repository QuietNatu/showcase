import { defaultVrtVariants } from '@/vrt/variants';
import { VrtScenario, createVrtStorybookScenarios } from '@natu/vrt';
import { test } from '@playwright/test';

const scenarios: VrtScenario[] = [{ story: 'default' }];

const testScenarios = createVrtStorybookScenarios({
  scenarios,
  page: 'components-sidebar',
  viewports: [{ name: 'custom', width: 200, height: 500 }],
  variants: defaultVrtVariants,
});

testScenarios.forEach((scenario) => {
  test(scenario.id, async ({ page }, testInfo) => {
    await scenario.test(page, testInfo);
  });
});
