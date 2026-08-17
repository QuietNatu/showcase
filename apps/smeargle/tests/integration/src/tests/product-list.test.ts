import { expect, test } from '@playwright/test';

import { Scenario } from '../configs/scenarios';
import { setTestScenario } from './utils/page';

test('shows page content', async ({ page }) => {
  await page.goto('/products');

  await expect(page.getByRole('heading', { name: 'Products' })).toBeVisible();
  await expect(page.getByText('Product count: 3')).toBeVisible();
  await expect(page.getByRole('list')).toBeVisible();
  await expect(page.getByRole('listitem')).toHaveCount(3);
});

test('shows error page', async ({ page }) => {
  await setTestScenario(page, Scenario.GetProductsError);

  await page.goto('/products');

  await expect(page.getByText('An unexpected error has occurred')).toBeVisible();
});
