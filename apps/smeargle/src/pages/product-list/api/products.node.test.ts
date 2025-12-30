import { test } from 'vitest';
import { getProductListProducts } from './products';
import { expect } from '@playwright/test';
import { mockDatabase } from '../../../mocks/api/database/database';
import { createProductMock } from '../../../mocks/api/factories/product-factory';

test('example', async () => {
  await mockDatabase.products.createMany(3, () => createProductMock());

  expect(await getProductListProducts()).toHaveLength(3);
});
