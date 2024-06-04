import { VrtScenario, createVrtStorybookScenarios } from '@natu/vrt';
import { test } from '@playwright/test';
import { defaultVrtVariants } from '../../vrt/variants';

const scenarios: VrtScenario[] = [{ story: 'default' }];

const testScenarios = createVrtStorybookScenarios({
  scenarios,
  page: 'components-header',
  viewports: [{ name: 'custom', width: 500, height: 200 }],
  variants: defaultVrtVariants,
});

testScenarios.forEach((scenario) => {
  test(scenario.id, async ({ page }, testInfo) => {
    await scenario.test(page, testInfo);
  });
});
