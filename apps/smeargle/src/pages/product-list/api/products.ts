import { createServerFn } from '@tanstack/react-start';
import { getProducts } from '../../../gen/api/endpoints/products/products';

/**
 *
 */
export const getProductListProducts = createServerFn().handler(async () => {
  const response = await getProducts();
  return response.data;
});
