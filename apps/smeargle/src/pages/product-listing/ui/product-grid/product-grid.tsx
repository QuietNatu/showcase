import { ProductDto } from '../../../../shared/api/gen/models/product-dto';
import { ProductCard } from '../product-card/product-card';

type Props = Readonly<{
  products: ProductDto[];
}>;

/**
 * TODO
 */
export function ProductGrid(props: Props) {
  const { products } = props;

  return (
    <ul>
      {products.map((product) => (
        <li key={product.id}>
          <ProductCard slug={product.slug} />
        </li>
      ))}
    </ul>
  );
}
