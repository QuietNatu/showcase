import { VrtScenario, createVrtStorybookScenarios } from '@natu/vrt';
import { test } from '@playwright/test';

const scenarios: VrtScenario[] = [
  { story: 'default' },
  { story: 'expanded' },
  { story: 'active' },
  { story: 'active-expanded' },
];

const testScenarios = createVrtStorybookScenarios({
  scenarios,
  page: 'components-sidebar',
  viewports: [{ name: 'custom', width: 100, height: 600 }],
});

testScenarios.forEach((scenario) => {
  test(scenario.id, async ({ page }, testInfo) => {
    await scenario.test(page, testInfo);
  });
});
