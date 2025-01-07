import './styles/globals.css';

import { ReactNode } from 'react';

import { Alert } from 'features/alert';
import { Toast } from 'features/toast';
import GlobalStyle from 'styles/globalStyle';

import { StyledContainer } from './Layout.style';

interface LayoutProps {
  children?: ReactNode;
}

export function Layout(props: LayoutProps) {
  const { children } = props;

  return (
    <StyledContainer>
      <GlobalStyle />
      {children}
      <Toast />
      <Alert />
      <div id="tooltip-root"></div>
      <div id="modal-root"></div>
    </StyledContainer>
  );
}
