import React from 'react';
import { Footer, Header, Layout } from 'layout';
import { DailyCheck } from 'features/dailyCheck';
export const DailyCheckPage = () => {
  return (
    <Layout>
      <Header
        title="Daily Check-In"
        content="Earn rewards for checking in every day!<br/>Max out your streak to unlock big bonuses!"
      />
      <DailyCheck />
      <Footer />
    </Layout>
  );
};
