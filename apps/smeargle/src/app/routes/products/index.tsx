import { createFileRoute } from '@tanstack/react-router';
import { ProductGrid } from './-components/product-grid/product-grid';
import { createServerFn } from '@tanstack/react-start';
import { getProducts } from '../../../gen/api/endpoints/products/products';

const getProductsFn = createServerFn().handler(async () => {
  // TODO: BASE URL
  const response = await getProducts({ baseURL: 'http://localhost:6010' });
  return response.data;
});

export const Route = createFileRoute('/products/')({
  component: RouteComponent,
  loader: () => getProductsFn(),
});

function RouteComponent() {
  const products = Route.useLoaderData();

  console.log({ products });

  return (
    <>
      <h1>Products</h1>
      <ProductGrid />
    </>
  );
}
