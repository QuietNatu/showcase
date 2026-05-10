import { mergeProps } from '@base-ui/react/merge-props';
import { useRender } from '@base-ui/react/use-render';
import clsx from 'clsx';
import type { ComponentProps } from 'react';
import { useId } from 'react';

import { createRequiredContext } from '../../utils/context';
import styles from './product-card.module.scss';

type HeadingTag = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

type RootProps = ComponentProps<'article'>;
type MediaProps = ComponentProps<'div'>;
type ImageProps = useRender.ComponentProps<'img'>;
type BodyProps = ComponentProps<'div'>;
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
 * TODO
 */
export function NatuProductCardMedia(props: MediaProps) {
  const { className, ...otherProps } = props;

  return <div {...otherProps} className={clsx(className, styles.media)} />;
}

/**
 * TODO
 */
export function NatuProductCardImage(props: ImageProps) {
  const { render, className, ...otherProps } = props;

  return useRender({
    defaultTagName: 'img',
    render,
    props: mergeProps<'img'>({ className: clsx(className, styles.image) }, otherProps),
  });
}

/**
 * TODO
 */
export function NatuProductCardBody(props: BodyProps) {
  const { className, ...otherProps } = props;

  return <div {...otherProps} className={clsx(className, styles.body)} />;
}

/**
 * A link to the product.
 * Renders an `<a>` element.
 */
export function NatuProductCardLink(props: LinkProps) {
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
export function NatuProductCardHeading(props: HeadingProps) {
  const { render, className, ...otherProps } = props;

  const id = useProductCardId();

  return useRender({
    defaultTagName: 'h3',
    render,
    props: mergeProps<HeadingTag>(
      { id: `${id}-heading`, className: clsx(className, styles.heading) },
      otherProps,
    ),
  });
}

/**
 * An interactable area that positions elements on top of the product link layer, allowing these elements to be interacted with (clicks, hovers, etc).
 * Renders a `<span>` element.
 */
export function NatuProductCardInteractable(props: InteractableProps) {
  const { render, className, ...otherProps } = props;

  return useRender({
    defaultTagName: 'span',
    render,
    props: mergeProps<'span'>({ className: clsx(className, styles.interactable) }, otherProps),
  });
}
