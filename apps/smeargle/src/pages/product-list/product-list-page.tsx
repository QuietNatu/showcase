import { ProductDto } from '../../gen/api/models/product-dto';
import { ProductGrid } from './ui/product-grid/product-grid';

type Props = Readonly<{
  products: ProductDto[];
}>;

/**
 *
 */
export function ProductListPage(props: Props) {
  const { products } = props;

  return (
    <>
      <h1>Products</h1>
      <div>{products.length}</div>
      <ProductGrid />
    </>
  );
}
