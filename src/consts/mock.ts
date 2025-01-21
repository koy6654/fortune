import dayjs from 'dayjs';
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

export const DEFAULT_MOCK_TOKEN = { token: 'fortune-mock-token' };

export const DEFAULT_MOCK_SYNC = {
  user: {
    id: 10,
    telegram_id: 10,
    first_name: 'lee',
    last_name: 'jae',
    usernames: null,
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
export const DEFAULT_MOCK_DAILY_CHECK = [
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

export const DEFAULT_MOCK_DAILY_CLAIM = {
  success: true,
  message: 'message',
  balance: 100,
};

export const DEFAULT_MOCK_REFERRED_USERS = {
  data: [
    {
      id: 10,
      telegram_id: 10,
      first_name: 'lee',
      last_name: 'jae',
      usernames: null,
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

export const DEFAULT_MOCK_USER_FORTUNE = {
  'fortune-message': '"Buy low, sell high...unless it\'s crypto, then just HODL and pray for the moon 🚀🌕"',
};

export const DEFULAT_MOCK_USER_HISTORY = {
  fortuneMessages: [
    {
      id: 1,
      default_message: 'test message',
      message: 'fortune message',
    },
    {
      id: 2,
      default_message: 'test message',
      message: 'fortune message',
    },
    {
      id: 3,
      default_message: 'test message',
      message: null,
    },
  ],
  startDate: 'Jan 10, 2025',
};
