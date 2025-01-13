import React from 'react';
import './footer.style.scss';
import { useParams, useNavigate } from 'react-router-dom';
import { DEFAULT_SERVICE_PATH, DEFAULT_ROUTES_PATH, DEFAULT_FALLBACK_URL } from 'consts';

export const Footer = () => {
  const navigate = useNavigate();

  const handleMovePath = (path: string) => {
    navigate(`${DEFAULT_ROUTES_PATH}/${path}`);
  };

  return (
    <>
      <div>
        <button
          className="my-button"
          type="button"
          onClick={() => {
            handleMovePath('home');
          }}
        >
          Home
        </button>
        <button
          className="my-button"
          onClick={() => {
            handleMovePath('task');
          }}
        >
          Task
        </button>
        <button
          className="my-button"
          onClick={() => {
            handleMovePath('stake');
          }}
        >
          Stake
        </button>
        <button
          className="my-button"
          onClick={() => {
            handleMovePath('check-in');
          }}
        >
          Check-in
        </button>
        <button
          className="my-button"
          onClick={() => {
            handleMovePath('history');
          }}
        >
          History
        </button>
      </div>
    </>
  );
};
