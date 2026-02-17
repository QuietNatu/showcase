import { getProducts } from '../../../shared/api/gen/endpoints/products/products';
import { ProductDto } from '../../../shared/api/gen/models/product-dto';
import { Either } from '../../../shared/lib/data-types';

/** Gets the list of products */
export async function getProductListingPageProducts(): Promise<Either<ProductDto[], Error>> {
  try {
    const response = await getProducts();
    return Either.right(response.data);
  } catch {
    // TODO: error logging

    return Either.left(new Error('Failed to get products'));
  }
}
