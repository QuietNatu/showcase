import { createDatabase } from '../../../../../src/mocks/api/database/database';
import { createProductMock } from '../../../../../src/mocks/api/factories/product-factory';

const standardDatabase = createDatabase();

await standardDatabase.products.createMany(3, () => createProductMock());

export { standardDatabase };
