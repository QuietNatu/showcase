import { NatuProductCard } from '@natu/ui-react/components/product-card';

import { Link } from '@tanstack/react-router';

type Props = Readonly<{
  slug: string;
  name: string;
  onAddToWishlist: () => void;
}>;

/**
 * TODO
 */
export function ProductListingCard(props: Props) {
  const { slug, name, onAddToWishlist } = props;

  return (
    <NatuProductCard.Root>
      <NatuProductCard.Link
        render={<Link to="/products/$productSlug" params={{ productSlug: slug }} />}
      />
      <NatuProductCard.Heading>{name}</NatuProductCard.Heading>
      <NatuProductCard.Interactable
        render={
          <button type="button" onClick={onAddToWishlist}>
            Add to Wishlist
          </button>
        }
      />
    </NatuProductCard.Root>
  );
}
