import { ProductCard } from '../product-card/product-card';

/**
 * TODO
 */
export function ProductGrid() {
  return (
    <ul>
      <li>
        <ProductCard slug="product_1" />
      </li>
      <li>
        <ProductCard slug="product_2" />
      </li>
      <li>
        <ProductCard slug="product_3" />
      </li>
      <li>
        <ProductCard slug="product_4" />
      </li>
    </ul>
  );
}
