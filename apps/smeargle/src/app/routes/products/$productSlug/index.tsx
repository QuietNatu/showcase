import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/products/$productSlug/')({
  component: RouteComponent,
});

function RouteComponent() {
  return <h1>Product</h1>;
}
