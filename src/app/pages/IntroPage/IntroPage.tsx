import { Intro } from 'features/intro';
import React from 'react';

type IntroPageProps = {
  start: boolean;
};

export const IntroPage = ({ start }: IntroPageProps) => {
  return (
    <div>
      <Intro start={start} />
    </div>
  );
};
