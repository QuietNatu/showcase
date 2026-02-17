import { ProductDto } from '../../../shared/api/gen/models/product-dto';
import { Either } from '../../../shared/lib/data-types';
import { getProductListingPageProducts } from './get-products.server';

/** Gets data needed by the product list page */
export async function getProductListingPageData(): Promise<
  Either<{ products: ProductDto[] }, Error>
> {
  const productsResult = await getProductListingPageProducts();

  return Either.mapBoth(productsResult, {
    onLeft: () => new Error('Failed to get product listing page data'),
    onRight: (products) => ({ products }),
  });
}
