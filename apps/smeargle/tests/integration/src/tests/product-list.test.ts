import { test, expect } from '@playwright/test';
import { mockDatabase } from '../../../../src/mocks/api/database/database';
import { createProductMock } from '../../../../src/mocks/api/factories/product-factory';

test('has heading', async ({ page }) => {
  await page.setExtraHTTPHeaders({ 'test-id': 'example-id' });

  await mockDatabase.products.createMany(3, () => createProductMock());

  await page.goto('/products');

  await expect(page.getByRole('heading', { name: 'Products' })).toBeVisible();
  await expect(page.getByText('Product count: 3')).toBeVisible();
});
