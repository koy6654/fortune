import dayjs from 'dayjs';
import {
  AuthResponse,
  DailyChecksResponse,
  DailyClaimResponse,
  FortuneTasksClaimResponse,
  FortuneTasksResponse,
  FortuneTasksStoreResponse,
  FortuneUserFortuneResponse,
  FortuneUserHistoryResponse,
  ReferredUsersResponse,
  SyncResponse,
} from 'features/services/service.model';
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

export const DEFAULT_MOCK_TOKEN: AuthResponse = { token: 'fortune-mock-token' };

export const DEFAULT_MOCK_SYNC: SyncResponse = {
  user: {
    id: 10,
    telegram_id: 10,
    first_name: 'lee',
    last_name: 'jae',
    usernames: 'lee jae',
    wallet: null,
    balance: 1200,
    login_streak: 0,
    production_per_hour: 0,
    referred_by: 1,
    last_login_date: null,
    created_at: '2025-01-13T07:57:30.000000Z',
    updated_at: '2025-01-14T07:31:45.000000Z',
    fortune: null,
    last_login_round: null,
  },
  isFortune: true,
  fortuneIndex: 1,
};

const now = dayjs();
const formattedDate = now.format('YYYY-MM-DD HH:mm:ss');
export const DEFAULT_MOCK_DAILY_CHECK: DailyChecksResponse = [
  {
    id: 1,
    name: 'Day 1',
    required_login_streak: 1,
    reward_coins: 5,
    created_at: now.subtract(2, 'day').format('YYYY-MM-DD HH:mm:ss'),
    updated_at: now.subtract(2, 'day').format('YYYY-MM-DD HH:mm:ss'),
    completed: 'done',
    available: false,
  },
  {
    id: 2,
    name: 'Day 2',
    required_login_streak: 1,
    reward_coins: 10,
    created_at: now.subtract(1, 'day').format('YYYY-MM-DD HH:mm:ss'),
    updated_at: now.subtract(1, 'day').format('YYYY-MM-DD HH:mm:ss'),
    completed: 'done',
    available: false,
  },
  {
    id: 3,
    name: 'Day 3',
    required_login_streak: 1,
    reward_coins: 20,
    created_at: formattedDate,
    updated_at: formattedDate,
    completed: null,
    available: true,
  },
  {
    id: 4,
    name: 'Day 4',
    required_login_streak: 1,
    reward_coins: 30,
    created_at: now.add(3, 'day').format('YYYY-MM-DD HH:mm:ss'),
    updated_at: now.add(3, 'day').format('YYYY-MM-DD HH:mm:ss'),
    completed: null,
    available: false,
  },
  {
    id: 5,
    name: 'Day 5',
    required_login_streak: 1,
    reward_coins: 35,
    created_at: now.add(4, 'day').format('YYYY-MM-DD HH:mm:ss'),
    updated_at: now.add(4, 'day').format('YYYY-MM-DD HH:mm:ss'),
    completed: null,
    available: false,
  },
  {
    id: 6,
    name: 'Day 6',
    required_login_streak: 1,
    reward_coins: 32,
    created_at: now.add(5, 'day').format('YYYY-MM-DD HH:mm:ss'),
    updated_at: now.add(5, 'day').format('YYYY-MM-DD HH:mm:ss'),
    completed: null,
    available: false,
  },
  {
    id: 7,
    name: 'Day 7',
    required_login_streak: 1,
    reward_coins: 35,
    created_at: now.add(6, 'day').format('YYYY-MM-DD HH:mm:ss'),
    updated_at: now.add(6, 'day').format('YYYY-MM-DD HH:mm:ss'),
    completed: null,
    available: false,
  },
];

export const DEFAULT_MOCK_DAILY_CLAIM: DailyClaimResponse = {
  success: true,
  message: 'message',
  balance: 100,
};

export const DEFAULT_MOCK_REFERRED_USERS: ReferredUsersResponse = {
  data: [
    {
      id: 10,
      telegram_id: 10,
      first_name: 'lee',
      last_name: 'jae',
      usernames: 'lee jae',
      wallet: null,
      balance: 1200,
      login_streak: 0,
      production_per_hour: 0,
      referred_by: 1,
      last_login_date: null,
      created_at: '2025-01-13T07:57:30.000000Z',
      updated_at: '2025-01-14T07:31:45.000000Z',
      fortune: null,
      last_login_round: null,
    },
  ],
  links: {
    first: 'http://localhost:8000/api/referred-users?page=1',
    last: 'http://localhost:8000/api/referred-users?page=3',
    prev: 'http://localhost:8000/api/referred-users?page=1',
    next: 'http://localhost:8000/api/referred-users?page=3',
  },
  meta: {
    current_page: 2,
    from: 2,
    last_page: 3,
    links: [
      {
        url: 'http://localhost:8000/api/referred-users?page=1',
        label: '&laquo; Previous',
        active: false,
      },
      {
        url: 'http://localhost:8000/api/referred-users?page=1',
        label: '1',
        active: false,
      },
      {
        url: 'http://localhost:8000/api/referred-users?page=2',
        label: '2',
        active: true,
      },
      {
        url: 'http://localhost:8000/api/referred-users?page=3',
        label: '3',
        active: false,
      },
      {
        url: 'http://localhost:8000/api/referred-users?page=3',
        label: 'Next &raquo;',
        active: false,
      },
    ],
    path: 'http://localhost:8000/api/referred-users',
    per_page: 1,
    to: 2,
    total: 3,
  },
};

export const DEFAULT_MOCK_USER_FORTUNE: FortuneUserFortuneResponse = {
  'fortune-message': '"Buy low, sell high...unless it\'s crypto, then just HODL and pray for the moon 🚀🌕"',
};

export const DEFULAT_MOCK_USER_HISTORY: FortuneUserHistoryResponse = {
  scrollMessages: [
    {
      id: 1,
      default_message: 'Not Opendle No cookie, no fortune.',
      created_at: '2025-01-21T17:28:49.000000Z',
      updated_at: '2025-01-21T17:28:49.000000Z',
      message: '"Buy low, sell high...or just HODL and hope for the best. #cryptostruggles"',
    },
    {
      id: 2,
      default_message: 'Not Opendle No cookie, no fortune.',
      created_at: '2025-01-21T17:30:00.000000Z',
      updated_at: '2025-01-21T17:30:00.000000Z',
      message:
        '"Buy low, sell high...unless it\'s crypto, then just hold on for dear life and hope for the best! \ud83d\ude80\ud83d\udcb8"',
    },
    {
      id: 3,
      default_message: 'Not Opendle No cookie, no fortune.',
      created_at: '2025-01-21T17:35:50.000000Z',
      updated_at: '2025-01-21T17:35:50.000000Z',
      message: '"Buy low, sell high, and HODL like your fortune depends on it... because it does! #CryptoLife"',
    },
    {
      id: 4,
      default_message: 'Not Opendle No cookie, no fortune.',
      created_at: '2025-01-21T17:35:52.000000Z',
      updated_at: '2025-01-21T17:35:52.000000Z',
      message: '"Buy low, sell high...or just HODL and hope for the best. #CryptoLife"',
    },
    {
      id: 5,
      default_message: 'Not Opendle No cookie, no fortune.',
      created_at: '2025-01-21T17:35:53.000000Z',
      updated_at: '2025-01-21T17:35:53.000000Z',
      message:
        '"Buy low, sell high, and remember: HODL onto your fortune like it\'s a hot potato!" \ud83e\udd60\ud83d\udcb0 #CryptoLife',
    },
    {
      id: 6,
      default_message: 'Not Opendle No cookie, no fortune.',
      created_at: '2025-01-21T17:35:54.000000Z',
      updated_at: '2025-01-21T17:35:54.000000Z',
      message: '"Buy the dip, they said. Now I\'m swimming in a sea of red candles. #CryptoLife"',
    },
    {
      id: 7,
      default_message: 'Not Opendle No cookie, no fortune.',
      created_at: '2025-01-21T17:35:54.000000Z',
      updated_at: '2025-01-21T17:35:54.000000Z',
      message: '"Your crypto investments will either make you a millionaire or a meme-illionaire. Choose wisely."',
    },
    {
      id: 8,
      default_message: 'Not Opendle No cookie, no fortune.',
      created_at: '2025-01-21T17:35:55.000000Z',
      updated_at: '2025-01-21T17:35:55.000000Z',
      message:
        '"Buy low, sell high... unless it\'s crypto, then just HODL and pray for the moon!" \ud83d\ude80\ud83d\udcb0 #CryptoLife',
    },
    {
      id: 9,
      default_message: 'Not Opendle No cookie, no fortune.',
      created_at: '2025-01-21T17:35:55.000000Z',
      updated_at: '2025-01-21T17:35:55.000000Z',
      message:
        '"Buy low, sell high...unless you\'re in crypto, then it\'s more like buy high, panic sell, and HODL for dear life!" \ud83d\udcc8\ud83d\udcb8 #CryptoLife',
    },
    {
      id: 10,
      default_message: 'Not Opendle No cookie, no fortune.',
      created_at: '2025-01-21T17:35:56.000000Z',
      updated_at: '2025-01-21T17:35:56.000000Z',
      message: '"Buy low, sell high... or just HODL and pray for the moon!" \ud83c\udf19\ud83d\udcb0 #CryptoFortunes',
    },
    {
      id: 11,
      default_message: 'Not Opendle No cookie, no fortune.',
      created_at: '2025-01-21T17:35:57.000000Z',
      updated_at: '2025-01-21T17:35:57.000000Z',
      message: '"Buy low, sell high...or just HODL and hope for the best. #cryptostruggles"',
    },
    {
      id: 12,
      default_message: 'Not Opendle No cookie, no fortune.',
      created_at: '2025-01-21T17:35:57.000000Z',
      updated_at: '2025-01-21T17:35:57.000000Z',
      message: null,
    },
    {
      id: 13,
      default_message: 'Not Opendle No cookie, no fortune.',
      created_at: '2025-01-21T17:35:58.000000Z',
      updated_at: '2025-01-21T17:35:58.000000Z',
      message: null,
    },
    {
      id: 14,
      default_message: 'Not Opendle No cookie, no fortune.',
      created_at: '2025-01-21T17:35:58.000000Z',
      updated_at: '2025-01-21T17:35:58.000000Z',
      message: null,
    },
    {
      id: 15,
      default_message: 'Not Opendle No cookie, no fortune.',
      created_at: '2025-01-21T17:35:59.000000Z',
      updated_at: '2025-01-21T17:35:59.000000Z',
      message: null,
    },
    {
      id: 16,
      default_message: 'Not Opendle No cookie, no fortune.',
      created_at: '2025-01-21T17:35:59.000000Z',
      updated_at: '2025-01-21T17:35:59.000000Z',
      message: null,
    },
    {
      id: 17,
      default_message: 'Not Opendle No cookie, no fortune.',
      created_at: '2025-01-21T17:36:00.000000Z',
      updated_at: '2025-01-21T17:36:00.000000Z',
      message: null,
    },
    {
      id: 18,
      default_message: 'Not Opendle No cookie, no fortune.',
      created_at: '2025-01-21T17:36:00.000000Z',
      updated_at: '2025-01-21T17:36:00.000000Z',
      message: null,
    },
    {
      id: 19,
      default_message: 'Not Opendle No cookie, no fortune.',
      created_at: '2025-01-21T17:36:01.000000Z',
      updated_at: '2025-01-21T17:36:01.000000Z',
      message: null,
    },
    {
      id: 20,
      default_message: 'Not Opendle No cookie, no fortune.',
      created_at: '2025-01-21T17:36:01.000000Z',
      updated_at: '2025-01-21T17:36:01.000000Z',
      message: null,
    },
    {
      id: 21,
      default_message: 'Not Opendle No cookie, no fortune.',
      created_at: '2025-01-21T17:36:18.000000Z',
      updated_at: '2025-01-21T17:36:18.000000Z',
      message: null,
    },
  ],
  startDate: 'Jan 20, 2025',
};

export const DEFAULT_MOCK_TASKS: FortuneTasksResponse[] = [
  {
    id: 1,
    name: 'Join Our Discord',
    description: 'Join our official Discord server and say hello in the #welcome channel.',
    reward_coins: 100,
    type: 'social',
    action_name: 'Join',
    link: 'https://discord.gg/yourgame',
    created_at: '2025-01-17T03:44:22.000000Z',
    updated_at: '2025-01-17T03:44:22.000000Z',
    image: null,
    is_submitted: null,
    is_rewarded: null,
    submitted_at: null,
  },
  {
    id: 2,
    name: 'Follow on Twitter',
    description: 'Follow our official Twitter account and retweet our pinned tweet.',
    reward_coins: 150,
    type: 'social',
    action_name: 'Follow',
    link: 'https://twitter.com/yourgame',
    created_at: '2025-01-17T03:44:22.000000Z',
    updated_at: '2025-01-17T03:44:22.000000Z',
    image: null,
    is_submitted: null,
    is_rewarded: null,
    submitted_at: null,
  },
  {
    id: 5,
    name: 'Join Telegram Group',
    description: 'Join our Telegram group and introduce yourself.',
    reward_coins: 175,
    type: 'social',
    action_name: 'Join',
    link: 'https://t.me/yourgame',
    created_at: '2025-01-17T03:44:22.000000Z',
    updated_at: '2025-01-17T03:44:22.000000Z',
    image: null,
    is_submitted: null,
    is_rewarded: null,
    submitted_at: null,
  },
  {
    id: 6,
    name: 'Join Telegram Group',
    description: 'Join our Telegram group and introduce yourself.',
    reward_coins: 175,
    type: 'social',
    action_name: 'Join',
    link: 'https://t.me/yourgame',
    created_at: '2025-01-17T03:44:22.000000Z',
    updated_at: '2025-01-17T03:44:22.000000Z',
    image: null,
    is_submitted: null,
    is_rewarded: null,
    submitted_at: null,
  },
  {
    id: 7,
    name: 'Join Telegram Group',
    description: 'Join our Telegram group and introduce yourself.',
    reward_coins: 175,
    type: 'social',
    action_name: 'Join',
    link: 'https://t.me/yourgame',
    created_at: '2025-01-17T03:44:22.000000Z',
    updated_at: '2025-01-17T03:44:22.000000Z',
    image: null,
    is_submitted: null,
    is_rewarded: null,
    submitted_at: null,
  },
  {
    id: 8,
    name: 'Join Telegram Group',
    description: 'Join our Telegram group and introduce yourself.',
    reward_coins: 175,
    type: 'social',
    action_name: 'Join',
    link: 'https://t.me/yourgame',
    created_at: '2025-01-17T03:44:22.000000Z',
    updated_at: '2025-01-17T03:44:22.000000Z',
    image: null,
    is_submitted: null,
    is_rewarded: null,
    submitted_at: null,
  },
  {
    id: 9,
    name: 'Join Telegram Group',
    description: 'Join our Telegram group and introduce yourself.',
    reward_coins: 175,
    type: 'social',
    action_name: 'Join',
    link: 'https://t.me/yourgame',
    created_at: '2025-01-17T03:44:22.000000Z',
    updated_at: '2025-01-17T03:44:22.000000Z',
    image: null,
    is_submitted: null,
    is_rewarded: null,
    submitted_at: null,
  },
  {
    id: 10,
    name: 'Join Telegram Group',
    description: 'Join our Telegram group and introduce yourself.',
    reward_coins: 175,
    type: 'social',
    action_name: 'Join',
    link: 'https://t.me/yourgame',
    created_at: '2025-01-17T03:44:22.000000Z',
    updated_at: '2025-01-17T03:44:22.000000Z',
    image: null,
    is_submitted: null,
    is_rewarded: null,
    submitted_at: null,
  },
  {
    id: 11,
    name: 'Join Telegram Group',
    description: 'Join our Telegram group and introduce yourself.',
    reward_coins: 175,
    type: 'social',
    action_name: 'Join',
    link: 'https://t.me/yourgame',
    created_at: '2025-01-17T03:44:22.000000Z',
    updated_at: '2025-01-17T03:44:22.000000Z',
    image: null,
    is_submitted: null,
    is_rewarded: null,
    submitted_at: null,
  },
  {
    id: 12,
    name: 'Join Telegram Group',
    description: 'Join our Telegram group and introduce yourself.',
    reward_coins: 175,
    type: 'social',
    action_name: 'Join',
    link: 'https://t.me/yourgame',
    created_at: '2025-01-17T03:44:22.000000Z',
    updated_at: '2025-01-17T03:44:22.000000Z',
    image: null,
    is_submitted: null,
    is_rewarded: null,
    submitted_at: null,
  },
];

export const DEFAULT_MOCK_TASKS_STORE: FortuneTasksStoreResponse = {
  success: true,
  message: 'message',
};

export const DEFAULT_MOCK_TASKS_CLAIM: FortuneTasksClaimResponse = {
  success: true,
  message: 'message',
};
