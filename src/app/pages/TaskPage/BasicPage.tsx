import React from 'react';
import { Footer, Header, Layout } from 'layout';
import { Basic } from 'features/basic';
export const BasicPage = () => {
  return (
    <Layout>
      <Header title="Task" content="Complete tasks to earn FRTN and boost your progress!" />
      <Basic />
      <Footer />
    </Layout>
  );
};
