import { BaseResponse, api_v1, apiAuth } from 'common/apis';
import { AuthParams, AuthResponse } from 'features/auth';
import {
  DailyChecksParams,
  DailyChecksResponse,
  DailyClaimParams,
  DailyClaimResponse,
  FortuneUserFortuneParams,
  FortuneUserFortuneResponse,
  FortuneUserHistoryParams,
  FortuneUserHistoryResponse,
  ReferredUsersParams,
  ReferredUsersResponse,
  SyncParams,
  SyncResponse,
} from './service.model';
import dayjs from 'dayjs';

/**
 * ### telegram-user
 * "url"/api/auth/telegram-user (POST)
 */
export async function postAuthTelegramUser(params: AuthParams): Promise<AuthResponse> {
  let { data } = await api_v1.post<BaseResponse<AuthResponse>>('/posts', {
    title: 'foo',
    body: 'bar',
    userId: 1,
    // auth params
    ...params,
  });

  // token
  data = { token: 'fortune-mock-token' };
  return data;
}

/**
 * ### sync
 * "url"/api/fortune/sync (GET)
 * @caution bearer token
 */
export async function getFortuneSync(params: SyncParams): Promise<SyncResponse> {
  let { data } = await apiAuth.get<BaseResponse<SyncResponse>>('/todos/1', {
    params,
  });

  data = {
    user: {
      id: 10,
      telegram_id: 10,
      first_name: 'lee',
      last_name: 'jae',
      username: null,
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

  return data;
}

/**
 * ### daily-checks
 * "url"/api/fortune/daily-ckecks (GET)
 * @caution bearer token
 */
export async function getFortuneDailyCheck(params: DailyChecksParams): Promise<DailyChecksResponse> {
  let { data } = await apiAuth.get<BaseResponse<DailyChecksResponse>>('/todos/1', {
    params,
  });

  const now = dayjs();
  const formattedDate = now.format('YYYY-MM-DD HH:mm:ss');

  data = [
    {
      id: 1,
      name: 'Day 1',
      required_login_streak: 1,
      reward_coins: 100,
      created_at: formattedDate,
      updated_at: formattedDate,
      completed: null,
      available: false,
    },
    {
      id: 2,
      name: 'Day 2',
      required_login_streak: 1,
      reward_coins: 100,
      created_at: now.add(1, 'day').format('YYYY-MM-DD HH:mm:ss'),
      updated_at: now.add(1, 'day').format('YYYY-MM-DD HH:mm:ss'),
      completed: null,
      available: false,
    },
  ];

  return data;
}

/**
 * ### daily-claim
 * "url"/api/fortune/daily-claim(POST)
 */
export async function postFortuneDailyClaim(params: DailyClaimParams): Promise<DailyClaimResponse> {
  let { data } = await apiAuth.post<BaseResponse<DailyClaimResponse>>('/posts', {
    title: 'foo',
    body: 'bar',
    userId: 1,
    // params
    ...params,
  });

  // token
  data = {
    success: true,
    message: 'message',
    balance: 100,
  };
  return data;
}

/**
 * ### referred-users
 * "url"/api/referred-users?page=1~(GET)
 */
export async function getReferredUsers(params: ReferredUsersParams): Promise<ReferredUsersResponse> {
  let { data } = await apiAuth.get<BaseResponse<ReferredUsersResponse>>('/todos/1', {
    params,
  });

  data = {
    data: [
      {
        id: 10,
        telegram_id: 10,
        first_name: 'lee',
        last_name: 'jae',
        username: null,
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

  return data;
}

/**
 * ### user fortune
 * "url"/api/fortune/user-fortune(GET)
 */
export async function getFortuneUserFortune(params: FortuneUserFortuneParams): Promise<FortuneUserFortuneResponse> {
  let { data } = await apiAuth.get<BaseResponse<FortuneUserFortuneResponse>>('/todos/1', {
    params,
  });

  data = {
    'fortune-message': '"Buy low, sell high...unless it\'s crypto, then just HODL and pray for the moon 🚀🌕"',
  };

  return data;
}

/**
 * ### user history
 * "url"/api/fortune/user-history (POST)
 */
export async function postFortuneUserHistory(params: FortuneUserHistoryParams): Promise<FortuneUserHistoryResponse> {
  let { data } = await apiAuth.post<BaseResponse<FortuneUserHistoryResponse>>('/posts', {
    title: 'foo',
    body: 'bar',
    userId: 1,
    // params
    ...params,
  });

  // token
  data = {
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
  return data;
}
