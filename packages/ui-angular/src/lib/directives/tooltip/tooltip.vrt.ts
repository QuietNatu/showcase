import { VrtScenario, createVrtStorybookScenarios } from '@natu/vrt';
import { test } from '@playwright/test';
import { defaultVrtVariants } from '../../../vrt/variants';

const scenarios: VrtScenario[] = [
  {
    story: 'default',
    onMount: async (page) => {
      await page.getByRole('button', { name: 'Show tooltip' }).hover();
      await page.getByRole('tooltip', { name: 'Tooltip Text' }).waitFor({ state: 'visible' });
    },
  },
];

const testScenarios = createVrtStorybookScenarios({
  scenarios,
  page: 'components-tooltip',
  viewports: [{ name: 'custom', width: 200, height: 200 }],
  variants: defaultVrtVariants,
});

testScenarios.forEach((scenario) => {
  test(scenario.id, async ({ page }, testInfo) => {
    await scenario.test(page, testInfo);
  });
});
