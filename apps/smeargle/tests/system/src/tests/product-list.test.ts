import { test, expect } from '@playwright/test';

test('has heading', async ({ page }) => {
  await page.goto('/products');

  await expect(page.getByRole('heading', { name: 'Products' })).toBeVisible();
});
