import { createDatabase } from '../../../../../src/mocks/api/database/database';
import { createMockProduct } from '../../../../../src/mocks/api/factories/product-factory';

const defaultDatabase = createDatabase();

await defaultDatabase.products.createMany(3, () => createMockProduct());

export { defaultDatabase };
