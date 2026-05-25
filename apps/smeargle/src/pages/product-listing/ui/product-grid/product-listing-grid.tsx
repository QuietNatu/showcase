import type { ProductDto } from '../../../../shared/api/gen/models/product-dto.zod';
import { ProductListingCard } from '../product-card/product-listing-card';
import styles from './product-listing-grid.module.scss';

type Props = Readonly<{
  products: ProductDto[];
}>;

/**
 * TODO
 */
export function ProductListingGrid(props: Props) {
  const { products } = props;

  return (
    <ul className={styles.grid}>
      {products.map((product) => (
        <li key={product.id}>
          <ProductListingCard
            slug={product.slug}
            name={product.name}
            imageUrl={product.imageUrl}
            onAddToCart={() => {
              // TODO
            }}
          />
        </li>
      ))}
    </ul>
  );
}
