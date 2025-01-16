import React from 'react';
import { Footer, Header, Layout } from 'layout';
import { Social } from 'features/social';
export const SocialPage = () => {
  return (
    <Layout>
      <Header title="Task" content="Complete tasks to earn FRTN and boost your progress!" />
      <Social />
      <Footer />
    </Layout>
  );
};
