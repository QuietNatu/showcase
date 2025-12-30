import { createFileRoute } from '@tanstack/react-router';
import { ProductListPage } from '../../pages/product-list/product-list-page';
import { getProductListProducts } from '../../pages/product-list/api/products';

export const Route = createFileRoute('/products/')({
  component: RouteComponent,
  loader: () => getProductListProducts(),
  // TODO: error
});

// TODO: forbid imports from app to other places

function RouteComponent() {
  const products = Route.useLoaderData();

  return <ProductListPage products={products} />;
}
