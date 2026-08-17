import { mergeProps } from '@base-ui/react/merge-props';
import { useRender } from '@base-ui/react/use-render';
import clsx from 'clsx';
import type { ComponentProps } from 'react';
import { useId } from 'react';

import { createRequiredContext } from '../../utils/context';
import styles from './headless-product-card.module.scss';

type HeadingTag = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

type RootProps = ComponentProps<'article'>;
type LinkProps = useRender.ComponentProps<'a'>;
type HeadingProps = useRender.ComponentProps<HeadingTag>;
type InteractableProps = useRender.ComponentProps<'span'>;

const [ProductCardIdContext, useProductCardId] = createRequiredContext<string>({
  name: 'ProductCardIdContext',
});

/**
 * Groups all parts of the product card.
 * Renders an `<article>` element.
 *
 * A product card shows a teaser of a product and provides a link to it.
 * This link covers the whole clickable area of the product card.
 * To add other interactable elements to the card (buttons, popovers, etc) use {@link NatuHeadlessProductCardInteractable}.
 */
export function NatuHeadlessProductCardRoot(props: RootProps) {
  const { className, ...otherProps } = props;

  const id = useId();

  return (
    <ProductCardIdContext value={id}>
      <article {...otherProps} className={clsx(className, styles.card)}>
        {props.children}
      </article>
    </ProductCardIdContext>
  );
}

/**
 * A link to the product.
 * Renders an `<a>` element.
 */
export function NatuHeadlessProductCardLink(props: LinkProps) {
  const { render, className, ...otherProps } = props;

  const id = useProductCardId();

  return useRender({
    defaultTagName: 'a',
    render,
    props: mergeProps<'a'>(
      {
        'aria-labelledby': `${id}-heading`,
        className: clsx(className, styles.link),
      },
      otherProps,
    ),
  });
}

/**
 * A heading for the product card.
 * Renders a `<h3>` element.
 */
export function NatuHeadlessProductCardHeading(props: HeadingProps) {
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
export function NatuHeadlessProductCardInteractable(props: InteractableProps) {
  const { render, className, ...otherProps } = props;

  return useRender({
    defaultTagName: 'span',
    render,
    props: mergeProps<'span'>({ className: clsx(className, styles.interactable) }, otherProps),
  });
}
