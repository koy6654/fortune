import React from 'react';
import { Footer, Header, Layout } from 'layout';
import { OnChain } from 'features/onChain';
export const OnChainPage = () => {
  return (
    <Layout>
      <Header title="Task" content="Complete tasks to earn FRTN and boost your progress!" />
      <OnChain />
      <Footer />
    </Layout>
  );
};
