import clsx from 'clsx';
import { ComponentPropsWithoutRef, ReactNode } from 'react';
import { NatuButton } from '../button/button';
import XIcon from '@natu/assets/svg/x.svg?react';
import { Slot } from '@radix-ui/react-slot';
import { NatuIcon } from '../icon/icon';

export interface NatuCardProps extends ComponentPropsWithoutRef<'div'> {
  children?: ReactNode;
  /**
   * Whether the card is part of another component or not.
   * Will hide borders, box-shadows, etc if true.
   */
  isEmbedded?: boolean;

  /** Whether to show the dismissable button or not. */
  isDismissable?: boolean;

  onDismiss?: () => void;
}

export interface NatuCardHeaderProps extends ComponentPropsWithoutRef<'div'> {
  children?: ReactNode;
  icon?: ReactNode;
  size?: 'small' | 'medium';
}

export interface NatuCardBodyProps extends ComponentPropsWithoutRef<'div'> {
  children?: ReactNode;
}

export interface NatuCardFooterProps extends ComponentPropsWithoutRef<'div'> {
  children?: ReactNode;
  hasDivider?: boolean;
  size?: 'small' | 'medium';
}

export function NatuCard(props: NatuCardProps) {
  const { className, isEmbedded, isDismissable, onDismiss, ...cardProps } = props;

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
          <span className="natu-visually-hidden">Dismiss</span>
          <NatuIcon aria-hidden="true">
            <XIcon />
          </NatuIcon>
        </NatuButton>
      )}
    </div>
  );
}

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

export function NatuCardBody(props: NatuCardBodyProps) {
  const { className, ...bodyProps } = props;
  return (
    <div {...bodyProps} className={clsx('natu-card__body', className)}>
      {props.children}
    </div>
  );
}

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
