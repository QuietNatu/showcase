import { vrtViewports } from '@natu/vrt';

import { test } from '@playwright/test';

import { createAppVrtPlans } from '../../../../test/vrt';

// TODO: why IDE plugin not detecting tests

const testPlans = createAppVrtPlans({
  page: 'pages-product-listing-grid',
  viewports: [vrtViewports.phone, vrtViewports.tablet, vrtViewports.laptop, vrtViewports.desktop],
  scenarios: [{ story: 'default' }],
});

for (const plan of testPlans) {
  test(plan.id, async ({ page }, testInfo) => {
    await plan.test(page, testInfo);
  });
}
