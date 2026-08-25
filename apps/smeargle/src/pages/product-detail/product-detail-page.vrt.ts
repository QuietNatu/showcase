import { vrtViewports } from '@natu/vrt';

import { test } from '@playwright/test';

import { createAppVrtPlans } from '../../test/vrt';

const testPlans = createAppVrtPlans({
  page: 'pages-product-detail',
  viewports: [vrtViewports.desktop],
  scenarios: [{ story: 'default' }],
});

for (const plan of testPlans) {
  test(plan.id, async ({ page }, testInfo) => {
    await plan.test(page, testInfo);
  });
}
