import { VrtScenario, createVrtStorybookScenarios } from '@natu/vrt';
import { test } from '@playwright/test';
import { defaultVrtVariants } from '../../vrt/variants';

const scenarios: VrtScenario[] = [
  { story: 'default' },
  { story: 'dismissable' },
  { story: 'embedded' },
  { story: 'small' },
  { story: 'with-footer-divider' },
  { story: 'no-header-or-footer' },
];

const testScenarios = createVrtStorybookScenarios({
  scenarios,
  page: 'components-card',
  viewports: [{ name: 'custom', width: 500, height: 500 }],
  variants: defaultVrtVariants,
});

testScenarios.forEach((scenario) => {
  test(scenario.id, async ({ page }, testInfo) => {
    await scenario.test(page, testInfo);
  });
});
