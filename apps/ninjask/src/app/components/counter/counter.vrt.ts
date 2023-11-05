import { VrtScenario, createVrtStorybookScenarios } from '@natu/vrt';
import { test } from '@playwright/test';

const scenarios: VrtScenario[] = [{ story: 'default' }];

const testScenarios = createVrtStorybookScenarios({
  scenarios,
  page: 'components-counter',
  viewports: [{ name: 'custom', width: 300, height: 100 }],
});

testScenarios.forEach((scenario) => {
  test(scenario.id, async ({ page }, testInfo) => {
    await scenario.test(page, testInfo);
  });
});
