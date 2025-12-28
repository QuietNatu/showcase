import { createFileRoute } from '@tanstack/react-router';
import { createServerFn } from '@tanstack/react-start';
import { getProducts } from '../../gen/api/endpoints/products/products';
import { ProductListPage } from '../../pages/products/list/product-list-page';

// TODO improve
const getProductsFn = createServerFn().handler(async () => {
  const response = await getProducts();
  return response.data;
});

export const Route = createFileRoute('/products/')({
  component: RouteComponent,
  loader: () => getProductsFn(),
});

// TODO: forbid imports from app to other places

function RouteComponent() {
  const products = Route.useLoaderData();

  return <ProductListPage products={products} />;
}
