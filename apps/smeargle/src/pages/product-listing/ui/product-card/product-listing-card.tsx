import { NatuProductCard } from '@natu/ui-react/components/product-card';

import { Link } from '@tanstack/react-router';

import styles from './product-listing-card.module.scss';

type Props = Readonly<{
  imageUrl: string;
  name: string;
  slug: string;
  onAddToCart: () => void;
}>;

/**
 * TODO
 */
export function ProductListingCard(props: Props) {
  const { slug, name, imageUrl, onAddToCart } = props;

  return (
    <NatuProductCard.Root>
      <NatuProductCard.Link
        render={<Link to="/products/$productSlug" params={{ productSlug: slug }} />}
      />

      <NatuProductCard.Media>
        <NatuProductCard.Image src={imageUrl} className={styles.image} />
      </NatuProductCard.Media>

      <NatuProductCard.Body className={styles.body}>
        <NatuProductCard.Heading>{name}</NatuProductCard.Heading>

        {/* TODO */}
        <p className={styles.price}>30,99 €</p>

        <NatuProductCard.Interactable
          render={
            <button type="button" onClick={onAddToCart}>
              Add to Cart
            </button>
          }
        />
      </NatuProductCard.Body>
    </NatuProductCard.Root>
  );
}
