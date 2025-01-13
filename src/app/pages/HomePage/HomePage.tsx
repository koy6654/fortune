import React from 'react';
import { Footer, HomeHeader, Layout } from 'layout';
import { Home } from 'features/home';
export const HomePage = () => {
  return (
    <Layout>
      <HomeHeader />
      <Home />
      <Footer />
    </Layout>
  );
};
