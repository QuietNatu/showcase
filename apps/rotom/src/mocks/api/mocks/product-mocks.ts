import { getGetProductsProductSlugResponseMock } from '../../../gen/api/endpoints/products/products.msw';
import { ProductDto } from '../../../gen/api/models/product-dto';
import { MockFactory } from './types';

export const createProductMock: MockFactory<ProductDto> = getGetProductsProductSlugResponseMock;
