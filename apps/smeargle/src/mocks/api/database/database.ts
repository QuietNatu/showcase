import { Collection } from '@msw/data';
import { getProductsProductSlugSchemaResponse } from '../../../shared/api/gen/endpoints/products/products.zod';

/** Creates a new, empty database. */
export function createDatabase() {
  const products = new Collection({
    schema: getProductsProductSlugSchemaResponse,
  });

  return {
    products,
  };
}

/** Single access point for all collections */
export const mockDatabase = createDatabase();

/** Clears all collections to avoid needing to clear each one individually */
export function clearMockDatabase() {
  mockDatabase.products.clear();
}
