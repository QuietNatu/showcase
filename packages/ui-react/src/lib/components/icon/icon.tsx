import clsx from 'clsx';
import { ComponentPropsWithoutRef } from 'react';

export type NatuIconProps = ComponentPropsWithoutRef<'div'>;

export function NatuIcon(props: NatuIconProps) {
  return <div {...props} className={clsx('natu-icon', props.className)} />;
}
