import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { DEFAULT_SERVICE_PATH, DEFAULT_ROUTES_PATH, DEFAULT_FALLBACK_URL } from 'consts';
import { ReactComponent as IntroFortuneScroll } from 'assets/images/intro/FortuneScroll.svg';
import { ReactComponent as IntroManyFortunes } from 'assets/images/intro/ManyFortunes.svg';

export const Intro = () => {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate(`${DEFAULT_ROUTES_PATH}/home`);
    }, 1000);
  }, []);

  return (
    <div className="flex flex-col justify-between h-screen bg-[#FFE0B5]">
      <div className="flex justify-center items-center flex-grow">
        <IntroFortuneScroll />
      </div>
      <div className="self-center mb-0">
        <IntroManyFortunes />
      </div>
    </div>
  );
};
