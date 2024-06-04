import { NatuSidebar, NatuSidebarProps } from '@natu/ui-react';
import { forwardRef } from 'react';
import styles from './sidebar.module.scss';
import clsx from 'clsx';

export const Sidebar = forwardRef<HTMLDivElement, NatuSidebarProps>(
  function Sidebar(props, forwardedRef) {
    return (
      <NatuSidebar
        ref={forwardedRef}
        {...props}
        className={clsx(props.className, styles.sidebar)}
      />
    );
  },
);
