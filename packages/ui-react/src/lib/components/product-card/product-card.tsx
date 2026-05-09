import { ComponentProps, useId } from 'react';
import { createRequiredContext } from '@natu/ui-react/utils/context';
import { useRender } from '@base-ui/react/use-render';
import { mergeProps } from '@base-ui/react/merge-props';

type HeadingTag = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

type RootProps = ComponentProps<'article'>;
type LinkProps = useRender.ComponentProps<'a'>;
type HeadingProps = useRender.ComponentProps<HeadingTag>;
type InteractableProps = useRender.ComponentProps<'span'>;

const [ProductCardIdContext, useProductCardId] = createRequiredContext<string>({
  name: 'ProductCardIdContext',
});

/**
 * Groups all parts of the ProductCard.
 * Renders an `<article>` element.
 *
 * A product card shows a teaser of a product and provides a link to it.
 * This link covers the whole clickable area of the product card.
 * To add other interactable elements to the card (buttons, popovers, etc) use {@link NatuProductCardInteractable}.
 */
export function NatuProductCardRoot(props: RootProps) {
  const id = useId();

  return (
    <ProductCardIdContext value={id}>
      <article {...props}>{props.children}</article>
    </ProductCardIdContext>
  );
}

/**
 * A link to the product.
 * Renders an `<a>` element.
 */
export function NatuProductCardLink(props: LinkProps) {
  const { render, ...otherProps } = props;

  const id = useProductCardId();

  return useRender({
    defaultTagName: 'a',
    render,
    props: mergeProps<'a'>({ 'aria-labelledby': `${id}-heading` }, otherProps),
  });
}

/**
 * A heading for the product card.
 * Renders a `<h3>` element.
 */
export function NatuProductCardHeading(props: HeadingProps) {
  const { render, ...otherProps } = props;

  const id = useProductCardId();

  return useRender({
    defaultTagName: 'h3',
    render,
    props: mergeProps<HeadingTag>({ id: `${id}-heading` }, otherProps),
  });
}

/**
 * An interactable area that positions elements on top of the product link layer, allowing these elements to be interacted with (clicks, hovers, etc).
 * Renders a `<span>` element.
 */
export function NatuProductCardInteractable(props: InteractableProps) {
  const { render, ...otherProps } = props;

  return useRender({
    defaultTagName: 'span',
    render,
    props: mergeProps<'span'>({ className: '' }, otherProps),
  });
}
