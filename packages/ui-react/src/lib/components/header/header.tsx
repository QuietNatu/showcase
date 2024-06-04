import clsx from 'clsx';
import { ComponentPropsWithoutRef, forwardRef } from 'react';

export const NatuHeader = forwardRef<HTMLElement, ComponentPropsWithoutRef<'header'>>(
  function NatuHeader(props, forwardedRef) {
    return (
      <header {...props} ref={forwardedRef} className={clsx('natu-header', props.className)}>
        {props.children}
      </header>
    );
  },
);
