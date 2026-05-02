import { describe, expect, test } from 'vitest';
import { mockDatabase } from '../../../mocks/api/database/database';
import { createProductMock } from '../../../mocks/api/factories/product-factory';
import { getProductListingPageProducts } from './get-products.server';
import { Either } from '../../../shared/lib/fp';
import { mockServer } from '../../../mocks/api/server';
import { getGetProductsMockHandler } from '../../../shared/api/gen/endpoints/products/products.msw';
import { HttpResponse } from 'msw';

describe('when products load successfully', () => {
  test('returns correct number of products', async () => {
    await mockDatabase.products.createMany(3, () => createProductMock());

    const result = await getProductListingPageProducts();

    expect.assert(Either.isRight(result));
    expect(result.right).toHaveLength(3);
  });
});

describe('when products fail to load', () => {
  test('returns error', async () => {
    mockServer.use(
      getGetProductsMockHandler(() => {
        throw HttpResponse.json({ error: 'Internal Server Error' }, { status: 500 });
      }),
    );

    const result = await getProductListingPageProducts();

    expect.assert(Either.isLeft(result));
    expect(result.left).toStrictEqual(new Error('Failed to get products'));
  });
});
