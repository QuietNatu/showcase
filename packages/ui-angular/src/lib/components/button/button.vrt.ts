import { VrtScenario, createVrtStorybookScenarios } from '@natu/vrt';
import { test } from '@playwright/test';

const scenarios: VrtScenario[] = [
  { story: 'default' },
  { story: 'small' },
  { story: 'disabled' },
  { story: 'custom-element' },
  { story: 'custom-element-disabled' },
];

const testScenarios = createVrtStorybookScenarios({
  scenarios,
  page: 'components-button',
  viewports: [{ name: 'custom', width: 300, height: 100 }], // TODO: adjust this
});

testScenarios.forEach((scenario) => {
  test(scenario.id, async ({ page }, testInfo) => {
    await scenario.test(page, testInfo);
  });
});
