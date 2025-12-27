import { test, expect } from '@playwright/test';

test('has heading', async ({ page }) => {
  await page.goto('/products/example-product');

  await expect(page.getByRole('heading', { name: 'Product' })).toBeVisible();
});
