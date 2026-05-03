import { Collection } from '@msw/data';
import { ProductDto } from '../../../shared/api/gen/models/product-dto.zod';

/** Creates a new, empty database. */
export function createDatabase() {
  const products = new Collection({ schema: ProductDto });

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
