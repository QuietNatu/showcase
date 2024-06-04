import { NatuHeaderProps, NatuHeader } from '@natu/ui-react';
import styles from './header.module.scss';
import logo from '/logo.svg';
import clsx from 'clsx';
import { forwardRef } from 'react';

/* TODO: add router link for logo when routing is implemented */

export const Header = forwardRef<HTMLElement, NatuHeaderProps>(
  function Header(props, forwardedRef) {
    return (
      /* TODO */
      <NatuHeader ref={forwardedRef} {...props} className={clsx(styles.header, props.className)}>
        <img src={logo} alt="Smeargle" className={styles.logo} />
      </NatuHeader>
    );
  },
);
