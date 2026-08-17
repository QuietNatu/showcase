import type { ReactNode } from 'react';

import styles from './app-layout.module.scss';

type Props = Readonly<{
  children: ReactNode;
}>;

/** Common layout of the app for all pages */
export function AppLayout(props: Props) {
  return <main className={styles.main}>{props.children}</main>;
}
