import { ProductDto } from '../../gen/api/models/product-dto';
import { ProductGrid } from './ui/product-grid/product-grid';

type Props = Readonly<{
  products: ProductDto[];
}>;

/** Primary way for users to navigate and search for products. */
export function ProductListingPage(props: Props) {
  const { products } = props;

  return (
    <>
      <h1>Products</h1>
      <div>{products.length}</div>
      <ProductGrid />
    </>
  );
}
