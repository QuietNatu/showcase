import { createServerFn } from '@tanstack/react-start';
import { getProducts } from '../../../gen/api/endpoints/products/products';

/** Loads data needed by the product list page */
export const loadProductListPageData = createServerFn().handler(async () => {
  const response = await getProducts();

  // TODO: error logging

  return { products: response.data };
});
