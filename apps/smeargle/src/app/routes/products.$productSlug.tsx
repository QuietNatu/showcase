import { createFileRoute } from '@tanstack/react-router';
import { ProductDetailPage } from '../../pages/product-detail/product-detail-page';

export const Route = createFileRoute('/products/$productSlug')({
  component: RouteComponent,
});

function RouteComponent() {
  return <ProductDetailPage />;
}
