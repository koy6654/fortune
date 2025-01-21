import type { Config } from '../types/type';

/** * @constant {Config} */
export const configs: Config = {
  appUrl: process.env.REACT_APP_URL || 'localhost:3000',
  apiDomain: process.env.REACT_APP_API_DOMAIN,
  botDomain: process.env.REACT_APP_BOT_DOMAIN,
  walletConnectProjectId: process.env.REACT_APP_WALLET_CONNECT_PROJECT_ID,
};

export const { appUrl, apiDomain, botDomain, walletConnectProjectId } = configs;

/** @constant {boolean} */
export const USE_DEV_MODE: boolean = process.env.REACT_APP_USE_DEV_MODE === 'true';

export const USE_MOCK: boolean = process.env.REACT_APP_USE_MOCK === 'true';
