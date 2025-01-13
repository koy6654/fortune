import 'styles/globals.css';

import { ReactNode } from 'react';

import { Alert } from 'features/alert';

interface LayoutProps {
  children?: ReactNode;
}

export function Layout(props: LayoutProps) {
  const { children } = props;

  return (
    <>
      {children}
      <Alert />
    </>
  );
}
