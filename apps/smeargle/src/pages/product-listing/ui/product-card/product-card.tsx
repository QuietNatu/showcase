import { NatuProductCard } from '@natu/ui-react/components/product-card';
import { Link } from '@tanstack/react-router';

type Props = Readonly<{
  slug: string;
  // TODO: required
  onAddToWishlistClick?: () => void;
}>;

/**
 * TODO
 */
export function ProductCard(props: Props) {
  const { slug } = props;

  return (
    <NatuProductCard.Root>
      <NatuProductCard.Link
        render={<Link to="/products/$productSlug" params={{ productSlug: slug }} />}
      />
      <NatuProductCard.Heading>Card Title</NatuProductCard.Heading>
      <NatuProductCard.Interactable render={<button type="button">Add to Wishlist</button>} />
    </NatuProductCard.Root>
  );
}
