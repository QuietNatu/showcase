import { describe, test } from 'vitest';
import { expect } from '@playwright/test';
import { mockDatabase } from '../../../mocks/api/database/database';
import { createProductMock } from '../../../mocks/api/factories/product-factory';
import { getProductListingPageProducts } from './get-products.server';

describe('when products load successfully', () => {
  test('returns correct number of products', async () => {
    await mockDatabase.products.createMany(3, () => createProductMock());

    const products = await getProductListingPageProducts();

    expect(products).toHaveLength(3);
  });
});

describe.todo('when products fail to load');
