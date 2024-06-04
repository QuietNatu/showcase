import clsx from 'clsx';
import { ComponentPropsWithoutRef, forwardRef } from 'react';

export type NatuHeaderProps = ComponentPropsWithoutRef<'header'>;

export const NatuHeader = forwardRef<HTMLElement, NatuHeaderProps>(
  function NatuHeader(props, forwardedRef) {
    return (
      <header {...props} ref={forwardedRef} className={clsx('natu-header', props.className)}>
        {props.children}
      </header>
    );
  },
);
