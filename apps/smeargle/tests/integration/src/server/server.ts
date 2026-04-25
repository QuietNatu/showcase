import { createServer } from '@mswjs/http-middleware';
import { getGetProductsMockHandler } from '../../../../src/shared/api/gen/endpoints/products/products.msw';

const port = process.env.PORT ?? 6006;
const httpServer = createServer(getGetProductsMockHandler([{ id: '1', slug: 'product_1' }]));

httpServer.listen(port, () => {
  // eslint-disable-next-line no-console -- server log
  console.log(`Mock server is running on http://localhost:${port}`);
});
