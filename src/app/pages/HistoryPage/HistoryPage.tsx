import { Footer, Header, Layout } from 'layout';
import React from 'react';
import { History } from 'features/history';
export const HistoryPage = () => {
  return (
    <Layout>
      <Header
        title="History"
        content="Your fortunes have a 7-day expiration<br />just like cookies, they’re best enjoyed fresh!"
      />
      <History />
      <Footer />
    </Layout>
  );
};
