import { VrtScenario, createVrtStorybookScenarios } from '@natu/vrt';
import { test } from '@playwright/test';

const scenarios: VrtScenario[] = [
  { story: 'default' },
  {
    story: 'default',
    name: 'with-group',
    onMount: async (page) => {
      await page.getByRole('button', { name: 'Patients' }).click();
      await page.getByRole('link', { name: 'General Info' }).waitFor({ state: 'visible' });
    },
  },
  { story: 'expanded' },
  {
    story: 'expanded',
    name: 'with-group',
    onMount: async (page) => {
      await page.getByRole('button', { name: 'Patients' }).click();
      await page.getByRole('link', { name: 'General Info' }).waitFor({ state: 'visible' });
    },
  },
  { story: 'active' },
  { story: 'active-expanded' },
];

const testScenarios = createVrtStorybookScenarios({
  scenarios,
  page: 'components-sidebar',
  viewports: [{ name: 'custom', width: 600, height: 600 }],
});

testScenarios.forEach((scenario) => {
  test(scenario.id, async ({ page }, testInfo) => {
    await scenario.test(page, testInfo);
  });
});
