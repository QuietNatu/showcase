import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/products/$productSlug/')({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello &quot;/products/$productSlug/&quot;!</div>;
}
