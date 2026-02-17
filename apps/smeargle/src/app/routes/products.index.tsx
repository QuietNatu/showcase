import { createFileRoute } from '@tanstack/react-router';
import { createServerFn } from '@tanstack/react-start';
import { ProductListingPage } from '../../pages/product-listing/product-listing-page';
import { getProductListPageData } from '../../pages/product-listing/api/data.server';

const loadProductListPageData = createServerFn().handler(() => getProductListPageData());

export const Route = createFileRoute('/products/')({
  component: RouteComponent,
  loader: () => loadProductListPageData(),
});

function RouteComponent() {
  const { products } = Route.useLoaderData();

  return <ProductListingPage products={products} />;
}

// TODO: eslint is not type-checking correctly
