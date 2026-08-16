import { NatuProductCard } from '@natu/ui-react/components/product-card';

import { Link } from '@tanstack/react-router';
import type { ComponentProps } from 'react';

import styles from './product-listing-card.module.scss';

type Props = ComponentProps<typeof NatuProductCard.Root> &
  Readonly<{
    /** Teaser image url */
    imageUrl: string;
    /** Display name of the product */
    name: string;
    /** Slug for the the product detail page link */
    slug: string;
    /** Callback fired when product should be added to the cart */
    onAddToCart: () => void;
  }>;

/**
 * Shows a teaser of a product and provides a link to it.
 * Allows product to be added to the cart.
 */
export function ProductListingCard(props: Props) {
  const { slug, name, imageUrl, onAddToCart, ...otherProps } = props;

  return (
    <NatuProductCard.Root {...otherProps}>
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
