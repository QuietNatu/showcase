import { createFileRoute } from '@tanstack/react-router';
import { createServerFn } from '@tanstack/react-start';
import { ProductListingPage } from '../../pages/product-listing/product-listing-page';
import { getProductListingPageData } from '../../pages/product-listing/api/data.server';
import { Either } from '../../shared/lib/data-types';

const loadProductListingPageData = createServerFn().handler(async () => {
  const data = await getProductListingPageData();

  if (Either.isLeft(data)) {
    // Show error component
    throw new Error('Failed to load product listing page data');
  }

  return data.right;
});

export const Route = createFileRoute('/products/')({
  component: RouteComponent,
  loader: () => loadProductListingPageData(),
});

function RouteComponent() {
  const { products } = Route.useLoaderData();

  return <ProductListingPage products={products} />;
}

// TODO: eslint is not type-checking correctly
