import { defaultVrtVariants } from '@/vrt/variants';
import { VrtScenario, createVrtStorybookScenarios, defaultViewports } from '@natu/vrt';
import { test } from '@playwright/test';

const scenarios: VrtScenario[] = [{ story: 'default' }];

const testScenarios = createVrtStorybookScenarios({
  scenarios,
  page: 'app',
  viewports: [defaultViewports.desktop],
  variants: defaultVrtVariants,
});

testScenarios.forEach((scenario) => {
  test(scenario.id, async ({ page }, testInfo) => {
    await scenario.test(page, testInfo);
  });
});
