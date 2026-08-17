import { faker } from '@faker-js/faker';

import { getGetProductsProductSlugResponseMock } from '../../../shared/api/gen/endpoints/products/products.msw';
import type { ProductDto } from '../../../shared/api/gen/models/product-dto.zod';
import type { MockFactory } from './types';

/** Creates a product using mock data. All props can be overriden. */
export const createMockProduct: MockFactory<ProductDto> = (override = {}) => {
  const name = faker.commerce.productName();

  return getGetProductsProductSlugResponseMock({
    slug: faker.helpers.slugify(name),
    name,
    imageUrl: '/mocks/product-image.jpg',
    ...override,
  });
};
