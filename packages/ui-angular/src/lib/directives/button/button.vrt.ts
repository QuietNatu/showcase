import { VrtScenario, createVrtStorybookScenarios } from '@natu/vrt';
import { test } from '@playwright/test';
import { defaultVrtVariants } from '../../../vrt/variants';

const scenarios: VrtScenario[] = [
  { story: 'default' },
  { story: 'small' },
  { story: 'disabled' },
  { story: 'custom-element' },
  { story: 'custom-element-disabled' },
  { story: 'icon-button' },
  { story: 'icon-button-small' },
];

const testScenarios = createVrtStorybookScenarios({
  scenarios,
  page: 'components-button',
  viewports: [{ name: 'custom', width: 600, height: 100 }],
  variants: defaultVrtVariants,
});

testScenarios.forEach((scenario) => {
  test(scenario.id, async ({ page }, testInfo) => {
    await scenario.test(page, testInfo);
  });
});
