import { mockDatabase } from '../database/database';
import { createProductMock } from '../factories/product-factory';

/**
 * Seeds mock database with some predefined information.
 */
export async function seedMockDatabase() {
  await mockDatabase.products.create(createProductMock());
  await mockDatabase.products.create(createProductMock());
  await mockDatabase.products.create(createProductMock());
}
