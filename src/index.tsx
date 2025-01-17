import React from 'react';

import App from 'app';
import ReactDOM from 'react-dom/client';

import { beforeSetup, afterSetup } from './setup';
import { USE_DEV_MODE } from 'consts';

beforeSetup();

console.log('USE_DEV_MODE', USE_DEV_MODE);

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  // <React.StrictMode>
  <App />
  // </React.StrictMode>,
);

afterSetup();
