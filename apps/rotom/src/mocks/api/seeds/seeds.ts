import { mockDatabase } from '../database/database';
import { createMockProduct } from '../mocks/product-mocks';

/**
 * Seeds mock database with some predefined information.
 */
export async function seedMockDatabase() {
  await mockDatabase.products.create(createMockProduct());
  await mockDatabase.products.create(createMockProduct());
  await mockDatabase.products.create(createMockProduct());
}
