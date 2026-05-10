import type { ProductDto } from '../../shared/api/gen/models/product-dto.zod';
import { ProductListingGrid } from './ui/product-grid/product-listing-grid';

type Props = Readonly<{
  products: ProductDto[];
}>;

/** Primary way for users to navigate and search for products. */
export function ProductListingPage(props: Props) {
  const { products } = props;

  return (
    <>
      <h1>Products</h1>
      <div>Product count: {products.length}</div>

      <ProductListingGrid products={products} />
    </>
  );
}
