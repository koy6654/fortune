import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { DEFAULT_SERVICE_PATH } from 'consts';
import { ReactComponent as IntroFortuneScroll } from 'assets/images/intro/FortuneScroll.svg';
import { ReactComponent as IntroManyFortunes } from 'assets/images/intro/ManyFortunes.svg';
import { SetTimeout } from 'types/type';

type IntroProps = {
  start: boolean;
};

export const Intro = (props: IntroProps) => {
  const { start } = props;
  const navigate = useNavigate();

  useEffect(() => {
    if (start) {
      const timer: SetTimeout = setTimeout(() => {
        navigate(`${DEFAULT_SERVICE_PATH}/home`);
      }, 1000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [navigate, start]);

  return (
    <div className="flex flex-col justify-between h-screen bg-[#FFE0B5]">
      <div className="flex justify-center items-center flex-grow">
        <IntroFortuneScroll />
      </div>
      <div className="self-center mb-0 w-full">
        <IntroManyFortunes className="w-full object-cover" />
      </div>
    </div>
  );
};
