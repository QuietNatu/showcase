import { VrtScenario, createVrtStorybookScenarios } from '@natu/vrt';
import { test } from '@playwright/test';
import { defaultVrtVariants } from '../../vrt/variants';

const scenarios: VrtScenario[] = [
  {
    story: 'default',
    onMount: async (page) => {
      await page.getByRole('button', { name: 'Show popover' }).click();
      await page.getByRole('dialog').getByText('Popover text').waitFor({ state: 'visible' });
    },
  },
  {
    story: 'with-embedded-content',
    onMount: async (page) => {
      await page.getByRole('button', { name: 'Show popover' }).click();
      await page.getByRole('dialog').getByText('Popover text').waitFor({ state: 'visible' });
    },
  },
];

const testScenarios = createVrtStorybookScenarios({
  scenarios,
  page: 'components-popover',
  viewports: [{ name: 'custom', width: 200, height: 400 }],
  variants: defaultVrtVariants,
});

testScenarios.forEach((scenario) => {
  test(scenario.id, async ({ page }, testInfo) => {
    await scenario.test(page, testInfo);
  });
});
