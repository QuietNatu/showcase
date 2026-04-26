import { test, expect } from '@playwright/test';
import { Scenario } from '../configs/scenarios';
import { setTestScenario } from './utils/page-utils';

// TODO: improve test naming?
// TODO: explain default test scenario in docs and how mock server works overall

test('has heading', async ({ page }) => {
  await page.goto('/products');

  await expect(page.getByRole('heading', { name: 'Products' })).toBeVisible();
  await expect(page.getByText('Product count: 3')).toBeVisible();
});

test('shows error page', async ({ page }) => {
  await setTestScenario(page, Scenario.GetProductsError);

  await page.goto('/products');

  await expect(page.getByText('An unexpected error has occurred')).toBeVisible();
});
