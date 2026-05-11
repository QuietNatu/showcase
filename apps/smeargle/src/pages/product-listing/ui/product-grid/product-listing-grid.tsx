import type { ProductDto } from '../../../../shared/api/gen/models/product-dto.zod';
import { ProductListingCard } from '../product-card/product-listing-card';

type Props = Readonly<{
  products: ProductDto[];
}>;

/**
 * TODO
 */
export function ProductListingGrid(props: Props) {
  const { products } = props;

  return (
    <ul>
      {products.map((product) => (
        <li key={product.id}>
          <ProductListingCard
            slug={product.slug}
            name={product.name}
            imageSrc="" // TODO
            onAddToCart={() => {
              // TODO
            }}
          />
        </li>
      ))}
    </ul>
  );
}
