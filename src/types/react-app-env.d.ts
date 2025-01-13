/// <reference types="react-scripts" />

declare namespace NodeJS {
  interface ProcessEnv {
    REACT_APP_USE_DEV_MODE: 'true' | 'false';
    REACT_APP_URL: string;
    REACT_APP_API_DOMAIN: string;
    REACT_APP_BOT_DOMAIN: string;
    REACT_APP_WALLET_CONNECT_PROJECT_ID: string;
  }
}
