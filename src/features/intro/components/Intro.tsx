import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { DEFAULT_SERVICE_PATH, DEFAULT_ROUTES_PATH, DEFAULT_FALLBACK_URL } from 'consts';
export const Intro = () => {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate(`${DEFAULT_ROUTES_PATH}/home`);
    }, 1000);
  }, []);

  return <div>Intro</div>;
};
