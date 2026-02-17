import { getGetProductsProductSlugResponseMock } from '../../../shared/api/gen/endpoints/products/products.msw';
import { ProductDto } from '../../../shared/api/gen/models/product-dto';
import { MockFactory } from './types';

export const createProductMock: MockFactory<ProductDto> = getGetProductsProductSlugResponseMock;
