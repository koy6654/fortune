import React from 'react';
import { Footer, Header, Layout } from 'layout';
import { Invite } from 'features/invite';
export const InvitePage = () => {
  return (
    <Layout>
      <Header title="Invite" content="Invite friends to earn extra FRTN" />
      <Invite />
      <Footer />
    </Layout>
  );
};
