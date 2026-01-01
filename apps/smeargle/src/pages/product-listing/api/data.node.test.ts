import { test } from 'vitest';
import { expect } from '@playwright/test';
import { mockDatabase } from '../../../mocks/api/database/database';
import { createProductMock } from '../../../mocks/api/factories/product-factory';
import { loadProductListPageData } from './data';

test('example', async () => {
  await mockDatabase.products.createMany(3, () => createProductMock());

  const { products } = await loadProductListPageData();

  expect(products).toHaveLength(3);
});
