import { mockDatabase } from '../database/database';
import { createMockProduct } from '../factories/product-factory';

/**
 * Seeds mock database with some predefined information.
 */
export async function seedMockDatabase() {
  await mockDatabase.products.create(createMockProduct());
  await mockDatabase.products.create(createMockProduct());
  await mockDatabase.products.create(createMockProduct());
}
