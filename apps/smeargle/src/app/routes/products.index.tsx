import { createFileRoute } from '@tanstack/react-router';
import { ProductListingPage } from '../../pages/product-listing/product-listing-page';
import { loadProductListPageData } from '../../pages/product-listing/api/data';

export const Route = createFileRoute('/products/')({
  component: RouteComponent,
  loader: () => loadProductListPageData(),
});

function RouteComponent() {
  const { products } = Route.useLoaderData();

  return <ProductListingPage products={products} />;
}
