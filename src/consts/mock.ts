import { TelegramWebApps } from 'telegram-webapps-types';

export const DEFAULT_TELEGRAM_DATA: TelegramWebApps.WebAppInitData = {
  user: {
    id: 1,
    is_bot: false,
    first_name: 'John',
    last_name: 'Doe',
    usernames: 'johndoe',
    language_code: 'en-US',
    photo_url:
      'https://w7.pngwing.com/pngs/48/189/png-transparent-avatars-accounts-man-male-people-person-cowboy-hat-male-avatars-free-d-illustration-thumbnail.png',
  },
  start_param: 'ref1',
};
