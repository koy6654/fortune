import React from 'react';
import { Footer, Header, Layout } from 'layout';
import { Task } from 'features/task';
export const TaskPage = () => {
  return (
    <Layout>
      <Header title="Task" content="Complete tasks to earn FRTN and boost your progress!" />
      <Task />
      <Footer />
    </Layout>
  );
};
