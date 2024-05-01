import clsx from 'clsx';
import { ComponentPropsWithoutRef, forwardRef } from 'react';

export type NatuIconProps = ComponentPropsWithoutRef<'div'>;

export const NatuIcon = forwardRef<HTMLDivElement, NatuIconProps>(
  function NatuIcon(props, forwardedRef) {
    return <div ref={forwardedRef} {...props} className={clsx('natu-icon', props.className)} />;
  },
);
