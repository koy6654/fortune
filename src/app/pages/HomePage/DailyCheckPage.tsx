import React from 'react';
import { Footer, Header } from 'layout';
import { DailyCheck } from 'features/dailyCheck';
export const DailyCheckPage = () => {
  return (
    <div>
      {' '}
      <Header />
      <DailyCheck />
      <Footer />
    </div>
  );
};
