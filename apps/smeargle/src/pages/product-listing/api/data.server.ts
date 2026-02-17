import { getProductListingPageProducts } from './get-products.server';

/** Gets data needed by the product list page */
export async function getProductListPageData() {
  return { products: await getProductListingPageProducts() };
}
