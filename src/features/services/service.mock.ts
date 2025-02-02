import { BaseResponse, api_v1, apiAuth } from 'common/apis';

import {
  AuthParams,
  AuthResponse,
  DailyChecksParams,
  DailyChecksResponse,
  DailyClaimParams,
  DailyClaimResponse,
  FortuneTasksClaimParams,
  FortuneTasksClaimResponse,
  FortuneTasksParams,
  FortuneTasksResponse,
  FortuneTasksStoreParams,
  FortuneTasksStoreResponse,
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
  DEFAULT_MOCK_TASKS_STORE,
  DEFAULT_MOCK_TOKEN,
  DEFAULT_MOCK_USER_FORTUNE,
  DEFAULT_MOCK_TASKS,
  DEFULAT_MOCK_USER_HISTORY,
  DEFAULT_MOCK_TASKS_CLAIM,
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
export async function getFortuneUserHistory(params: FortuneUserHistoryParams): Promise<FortuneUserHistoryResponse> {
  let { data } = await apiAuth.get<BaseResponse<FortuneUserHistoryResponse>>('/todos/1', {
    params,
  });

  data = DEFULAT_MOCK_USER_HISTORY;
  return data;
}

/**
 * ### tasks
 * "url"/api/fortune/tasks (GET)
 * @caution api auth
 */
export async function getFortuneTasks(params: FortuneTasksParams): Promise<FortuneTasksResponse[]> {
  let { data } = await apiAuth.get<BaseResponse<FortuneTasksResponse[]>>('/todos/1', {
    params,
  });

  data = DEFAULT_MOCK_TASKS;
  return data;
}

/**
 * ### tasks store
 * "url"/api/fortune/tasks/store(POST)
 * @caution api auth
 */
export async function postFortuneTasksStore(params: FortuneTasksStoreParams): Promise<FortuneTasksStoreResponse> {
  let { data } = await apiAuth.post<BaseResponse<FortuneTasksStoreResponse>>('/posts', {
    ...params,
  });

  data = DEFAULT_MOCK_TASKS_STORE;
  return data;
}

/**
 * ### tasks claim
 * "url"/api/fortune/tasks/claim(POST)
 * @caution api auth
 */
export async function postFortuneTasksClaim(params: FortuneTasksClaimParams): Promise<FortuneTasksClaimResponse> {
  let { data } = await apiAuth.post<BaseResponse<FortuneTasksClaimResponse>>('/posts', {
    ...params,
  });

  data = DEFAULT_MOCK_TASKS_CLAIM;
  return data;
}
