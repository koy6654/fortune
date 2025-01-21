import { BaseResponse, api_v1, apiAuth } from 'common/apis';

import {
  AuthParams,
  AuthResponse,
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
import {
  DEFAULT_MOCK_DAILY_CHECK,
  DEFAULT_MOCK_DAILY_CLAIM,
  DEFAULT_MOCK_REFERRED_USERS,
  DEFAULT_MOCK_SYNC,
  DEFAULT_MOCK_TOKEN,
  DEFAULT_MOCK_USER_FORTUNE,
  DEFULAT_MOCK_USER_HISTORY,
} from 'consts/mock';

/**
 * ### telegram-user
 * "url"/api/auth/telegram-user (POST)
 * @caution - api public
 */
export async function postAuthTelegramUser(params: AuthParams): Promise<AuthResponse> {
  let { data } = await api_v1.post<BaseResponse<AuthResponse>>('/posts', {
    title: 'foo',
    body: 'bar',
    userId: 1,
    ...params,
  });
  data = DEFAULT_MOCK_TOKEN;

  return data;
}

/**
 * ### sync
 * "url"/api/fortune/sync (GET)
 * @caution api auth
 */
export async function getFortuneSync(params: SyncParams): Promise<SyncResponse> {
  let { data } = await apiAuth.get<BaseResponse<SyncResponse>>('/todos/1', {
    params,
  });
  data = DEFAULT_MOCK_SYNC;

  return data;
}

/**
 * ### daily-checks
 * "url"/api/fortune/daily-checks (GET)
 * @caution api auth
 */
export async function getFortuneDailyChecks(params: DailyChecksParams): Promise<DailyChecksResponse> {
  let { data } = await apiAuth.get<BaseResponse<DailyChecksResponse>>('/todos/1', {
    params,
  });

  data = DEFAULT_MOCK_DAILY_CHECK;

  return data;
}

/**
 * ### daily-claim
 * "url"/api/fortune/daily-claim(POST)
 * @caution api auth
 */
export async function postFortuneDailyClaim(params: DailyClaimParams): Promise<DailyClaimResponse> {
  let { data } = await apiAuth.post<BaseResponse<DailyClaimResponse>>('/posts', {
    title: 'foo',
    body: 'bar',
    userId: 1,
    // params
    ...params,
  });

  data = DEFAULT_MOCK_DAILY_CLAIM;
  return data;
}

/**
 * ### referred-users
 * "url"/api/referred-users?page=1~(GET)
 * @caution api auth
 */
export async function getReferredUsers(params: ReferredUsersParams): Promise<ReferredUsersResponse> {
  let { data } = await apiAuth.get<BaseResponse<ReferredUsersResponse>>('/todos/1', {
    params,
  });

  data = DEFAULT_MOCK_REFERRED_USERS;

  return data;
}

/**
 * ### user fortune
 * "url"/api/fortune/user-fortune(GET)
 * @caution api auth
 */
export async function getFortuneUserFortune(params: FortuneUserFortuneParams): Promise<FortuneUserFortuneResponse> {
  let { data } = await apiAuth.get<BaseResponse<FortuneUserFortuneResponse>>('/todos/1', {
    params,
  });

  data = DEFAULT_MOCK_USER_FORTUNE;

  return data;
}

/**
 * ### user history
 * "url"/api/fortune/user-history (POST)
 * @caution api auth
 */
export async function postFortuneUserHistory(params: FortuneUserHistoryParams): Promise<FortuneUserHistoryResponse> {
  let { data } = await apiAuth.post<BaseResponse<FortuneUserHistoryResponse>>('/posts', {
    title: 'foo',
    body: 'bar',
    userId: 1,
    // params
    ...params,
  });

  data = DEFULAT_MOCK_USER_HISTORY;
  return data;
}
