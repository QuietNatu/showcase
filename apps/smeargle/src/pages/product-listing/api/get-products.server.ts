import { getProducts } from '../../../gen/api/endpoints/products/products';
import { ProductDto } from '../../../gen/api/models/product-dto';

/** Gets the list of products */
export async function getProductListingPageProducts(): Promise<ProductDto[]> {
  // TODO: handle error
  const response = await getProducts();

  // TODO: error logging

  return response.data;
}
