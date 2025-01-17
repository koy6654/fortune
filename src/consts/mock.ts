import { TelegramWebApps } from 'telegram-webapps-types';

export const DEFAULT_TELEGRAM_DATA = {
  user: {
    id: 1,
    first_name: 'John',
    last_name: 'Doe',
    usernames: 'johndoe',
  },

  start_param: 'ref1',
} as TelegramWebApps.WebAppInitData;
