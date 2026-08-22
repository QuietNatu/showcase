import { createDatabase } from '../../../../../src/mocks/api/database/database';
import { createMockProduct } from '../../../../../src/mocks/api/factories/product-factory';

const defaultDatabase = createDatabase();

// eslint-disable-next-line unicorn/no-top-level-side-effects -- ok for mock files
await defaultDatabase.products.createMany(3, () => createMockProduct());

export { defaultDatabase };
