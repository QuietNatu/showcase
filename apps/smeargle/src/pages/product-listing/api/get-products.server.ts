import { getProducts } from '../../../shared/api/gen/endpoints/products/products';
import type { ProductDto } from '../../../shared/api/gen/models/product-dto.zod';
import { Either } from '../../../shared/lib/fp';

/** Gets the list of products */
export async function getProductListingPageProducts(): Promise<Either<ProductDto[], Error>> {
  // TODO: error logging

  const result = await getProducts();

  return Either.mapBoth(result, {
    onLeft: () => new Error('Failed to get products'),
    onRight: (response) => response.data,
  });
}
