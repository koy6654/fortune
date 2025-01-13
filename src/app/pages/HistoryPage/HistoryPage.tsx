import { Footer, Header } from 'layout';
import React from 'react';
import { History } from 'features/history';
export const HistoryPage = () => {
  return (
    <div>
      <Header />
      <History />
      <Footer />
    </div>
  );
};
