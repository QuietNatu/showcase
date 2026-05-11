import { mergeProps } from '@base-ui/react/merge-props';
import { useRender } from '@base-ui/react/use-render';
import clsx from 'clsx';
import type { ComponentProps } from 'react';

import { NatuHeadlessProductCardInteractable } from './headless-product-card';
import { NatuHeadlessProductCardHeading } from './headless-product-card';
import { NatuHeadlessProductCardLink } from './headless-product-card';
import { NatuHeadlessProductCardRoot } from './headless-product-card';
import styles from './product-card.module.scss';

type RootProps = ComponentProps<typeof NatuHeadlessProductCardRoot>;
type MediaProps = ComponentProps<'div'>;
type ImageProps = useRender.ComponentProps<'img'>;
type BodyProps = ComponentProps<'div'>;
type HeadingProps = ComponentProps<typeof NatuHeadlessProductCardHeading>;
type LinkProps = ComponentProps<typeof NatuHeadlessProductCardLink>;
type InteractableProps = ComponentProps<typeof NatuHeadlessProductCardInteractable>;

/**
 * Groups all parts of the product card.
 * Renders an `<article>` element.
 *
 * A product card shows a teaser of a product and provides a link to it.
 * This link covers the whole clickable area of the product card.
 * To add other interactable elements to the card (buttons, popovers, etc) use {@link NatuProductCardInteractable}.
 */
export function NatuProductCardRoot(props: RootProps) {
  const { className, ...otherProps } = props;

  return <NatuHeadlessProductCardRoot {...otherProps} className={clsx(className, styles.card)} />;
}

/**
 * The visual area of the product card.
 * This is where most visual elements (images, badges) that are meant to grab the users' attention should be placed.
 */
export function NatuProductCardMedia(props: MediaProps) {
  const { className, ...otherProps } = props;

  return <div {...otherProps} className={clsx(className, styles.media)} />;
}

/**
 * The teaser image of the product card.
 * Renders a `img` element.
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
 * The body of the product card.
 * This is where most of the product's copy (name, description, price) is placed.
 */
export function NatuProductCardBody(props: BodyProps) {
  const { className, ...otherProps } = props;

  return <div {...otherProps} className={clsx(className, styles.body)} />;
}

/**
 * A heading for the product card.
 * Renders a `<h3>` element.
 */
export function NatuProductCardHeading(props: HeadingProps) {
  const { className, ...otherProps } = props;

  return (
    <NatuHeadlessProductCardHeading {...otherProps} className={clsx(className, styles.heading)} />
  );
}

/**
 * A link to the product.
 * Renders an `<a>` element.
 */
export function NatuProductCardLink(props: LinkProps) {
  return <NatuHeadlessProductCardLink {...props} />;
}

/**
 * An interactable area that positions elements on top of the product link layer, allowing these elements to be interacted with (clicks, hovers, etc).
 * Renders a `<span>` element.
 */
export function NatuProductCardInteractable(props: InteractableProps) {
  return <NatuHeadlessProductCardInteractable {...props} />;
}
