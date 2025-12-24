import { createFileRoute } from '@tanstack/react-router';
import { ProductGrid } from './-route/components/product-grid/product-grid';

export const Route = createFileRoute('/products/')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <h1>Products</h1>
      <ProductGrid />
    </>
  );
}
