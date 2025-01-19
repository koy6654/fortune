import React from 'react';
import { Footer, Layout } from 'layout';
import { Home, HomeHeader } from 'features/home';
export const HomePage = () => {
  return (
    <Layout>
      <HomeHeader />
      <Home />
      <Footer />
    </Layout>
  );
};
