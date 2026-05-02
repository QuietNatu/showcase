import { ReactNode } from 'react';

type Props = Readonly<{
  children: ReactNode;
}>;

/** Common layout of the app for all pages */
export function AppLayout(props: Props) {
  return <main>{props.children}</main>;
}
