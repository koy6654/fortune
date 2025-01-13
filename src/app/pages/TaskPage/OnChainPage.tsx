import React from 'react';
import { Footer, Header } from 'layout';
import { OnChain } from 'features/onChain';
export const OnChainPage = () => {
  return (
    <div>
      {' '}
      <Header />
      <OnChain />
      <Footer />
    </div>
  );
};
