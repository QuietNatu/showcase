import { getGetProductsProductSlugResponseMock } from '../../../shared/api/gen/endpoints/products/products.msw';
import type { ProductDto } from '../../../shared/api/gen/models/product-dto.zod';
import type { MockFactory } from './types';

export const createProductMock: MockFactory<ProductDto> = getGetProductsProductSlugResponseMock;
