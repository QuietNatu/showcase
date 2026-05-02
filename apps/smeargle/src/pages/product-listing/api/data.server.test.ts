import { describe, expect, test } from 'vitest';
import { mockDatabase } from '../../../mocks/api/database/database';
import { createProductMock } from '../../../mocks/api/factories/product-factory';
import { getProductListingPageData } from './data.server';
import { Either } from '../../../shared/lib/fp';
import { mockServer } from '../../../mocks/api/server';
import { HttpResponse } from 'msw';
import { getGetProductsMockHandler } from '../../../shared/api/gen/endpoints/products/products.msw';

describe('when all data loads successfully', () => {
  test('returns correct data', async () => {
    await mockDatabase.products.createMany(3, () => createProductMock());

    const result = await getProductListingPageData();

    expect.assert(Either.isRight(result));
    expect(result.right.products).toHaveLength(3);
  });
});

describe('when products fail to load', () => {
  test('returns error', async () => {
    mockServer.use(
      getGetProductsMockHandler(() => {
        throw HttpResponse.json({ error: 'Internal Server Error' }, { status: 500 });
      }),
    );
    const result = await getProductListingPageData();

    expect.assert(Either.isLeft(result));
    expect(result.left).toStrictEqual(new Error('Failed to get product listing page data'));
  });
});
