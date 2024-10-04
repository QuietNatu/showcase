import clsx from 'clsx';
import { ComponentPropsWithoutRef, ReactNode } from 'react';
import { NatuButton } from '../button/button';
import XIcon from '@natu/assets/svg/x.svg?react';
import { Slot } from '@radix-ui/react-slot';
import { NatuIcon } from '../icon/icon';
import { useTranslation } from 'react-i18next';

export interface NatuCardProps extends ComponentPropsWithoutRef<'div'> {
  readonly children?: ReactNode;
  /**
   * Whether the card is part of another component or not.
   * Will hide borders, box-shadows, etc if true.
   */
  readonly isEmbedded?: boolean;

  /** Whether to show the dismissable button or not. */
  readonly isDismissable?: boolean;

  readonly onDismiss?: () => void;
}

export interface NatuCardHeaderProps extends ComponentPropsWithoutRef<'div'> {
  readonly children?: ReactNode;
  readonly icon?: ReactNode;
  readonly size?: 'small' | 'medium';
}

export interface NatuCardBodyProps extends ComponentPropsWithoutRef<'div'> {
  readonly children?: ReactNode;
}

export interface NatuCardFooterProps extends ComponentPropsWithoutRef<'div'> {
  readonly children?: ReactNode;
  readonly hasDivider?: boolean;
  readonly size?: 'small' | 'medium';
}

/**
 * Displays content that should be grouped together.
 *
 * Contains all the parts of a card.
 */
export function NatuCard(props: NatuCardProps) {
  const { className, isEmbedded, isDismissable, onDismiss, ...cardProps } = props;

  const { t } = useTranslation(undefined, { keyPrefix: 'ui.card' });

  return (
    <div
      {...cardProps}
      className={clsx('natu-card', { 'natu-card--embedded': isEmbedded }, className)}
    >
      {props.children}

      {isDismissable && (
        <NatuButton
          type="button"
          className="natu-card__dismiss"
          variant="ghost"
          size="small"
          isIconButton={true}
          onClick={onDismiss}
        >
          <span className="natu-visually-hidden">{t('dismiss')}</span>
          <NatuIcon aria-hidden="true">
            <XIcon />
          </NatuIcon>
        </NatuButton>
      )}
    </div>
  );
}

/**
 * The header of the card.
 */
export function NatuCardHeader(props: NatuCardHeaderProps) {
  const { size = 'medium', className, icon, ...headerProps } = props;

  return (
    <div
      {...headerProps}
      className={clsx('natu-card__header', `natu-card__header--${size}`, className)}
    >
      <Slot className="natu-card__header-icon">{icon}</Slot>
      <div>{props.children}</div>
    </div>
  );
}

/**
 * The body of the card.
 */
export function NatuCardBody(props: NatuCardBodyProps) {
  const { className, ...bodyProps } = props;
  return (
    <div {...bodyProps} className={clsx('natu-card__body', className)}>
      {props.children}
    </div>
  );
}

/**
 * The footer of the card.
 */
export function NatuCardFooter(props: NatuCardFooterProps) {
  const { hasDivider, size = 'medium', className, ...footerProps } = props;

  return (
    <div
      {...footerProps}
      className={clsx(
        'natu-card__footer',
        `natu-card__footer--${size}`,
        { 'natu-card__footer--with-divider': hasDivider },
        className,
      )}
    >
      {props.children}
    </div>
  );
}
