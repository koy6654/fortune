import 'styles/globals.css';

import { ReactNode } from 'react';
import Background from 'assets/images/Background.png';
import { Alert } from 'features/alert';

interface LayoutProps {
  children?: ReactNode;
}

export function Layout(props: LayoutProps) {
  const { children } = props;

  return (
    <div
      className="w-full h-screen flex flex-col justify-between"
      style={{
        backgroundImage: `url(${Background})`,
        backgroundSize: 'cover',
      }}
    >
      <Alert />
      {children}
    </div>
  );
}
