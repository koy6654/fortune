import React from 'react';
import { Footer, Header } from 'layout';
import { Home } from 'features/home';
export const HomePage = () => {
  return (
    <div>
      <Header />
      <Home />
      <Footer />
    </div>
  );
};
