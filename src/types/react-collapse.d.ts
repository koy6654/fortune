declare module 'react-collapse' {
  import * as React from 'react';

  interface CollapseProps {
    isOpened: boolean;
    springConfig?: { stiffness: number; damping: number };
    children: React.ReactNode;
  }

  const Collapse: React.FC<CollapseProps>;

  export default Collapse;
}
