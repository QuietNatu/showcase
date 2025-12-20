import { Collection } from '@msw/data';
import { getProductsProductSlugSchemaResponse } from '../../../gen/api/endpoints/products/products.zod';

const products = new Collection({
  schema: getProductsProductSlugSchemaResponse,
});

/** Single access point for all collections */
export const mockDatabase = {
  products,
};

/** Clears all collections to avoid needing to clear each one individually */
export function clearMockDatabase() {
  mockDatabase.products.clear();
}
