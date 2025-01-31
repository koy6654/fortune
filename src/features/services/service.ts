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

/**
 * ### telegram-user
 * "url"/api/auth/telegram-user (POST)
 * @caution - api public
 */
export async function postAuthTelegramUser(params: AuthParams): Promise<AuthResponse> {
  let { data } = await api_v1.post<BaseResponse<AuthResponse>>('/api/auth/telegram-user', {
    ...params,
  });
  return data;
}

/**
 * ### sync
 * "url"/api/fortune/sync (GET)
 * @caution api auth
 */
export async function getFortuneSync(params: SyncParams): Promise<SyncResponse> {
  let { data } = await apiAuth.get<BaseResponse<SyncResponse>>('/api/fortune/sync', {
    params,
  });
  return data;
}

/**
 * ### daily-checks
 * "url"/api/fortune/daily-checks (GET)
 * @caution api auth
 */
export async function getFortuneDailyChecks(params: DailyChecksParams): Promise<DailyChecksResponse> {
  let { data } = await apiAuth.get<BaseResponse<DailyChecksResponse>>('/api/fortune/daily-checks', {
    params,
  });
  return data;
}

/**
 * ### daily-claim
 * "url"/api/fortune/daily-claim(POST)
 * @caution api auth
 */
export async function postFortuneDailyClaim(params: DailyClaimParams): Promise<DailyClaimResponse> {
  let { data } = await apiAuth.post<BaseResponse<DailyClaimResponse>>('/api/fortune/daily-claim', {
    ...params,
  });
  return data;
}

/**
 * ### referred-users
 * "url"/api/referred-users?page=1~(GET)
 * @caution api auth
 */
export async function getReferredUsers(params: ReferredUsersParams): Promise<ReferredUsersResponse> {
  let { data } = await apiAuth.get<BaseResponse<ReferredUsersResponse>>('/api/referred-users', {
    params,
  });
  return data;
}

/**
 * ### user fortune
 * "url"/api/fortune/user-fortune(GET)
 * @caution api auth
 */
export async function getFortuneUserFortune(params: FortuneUserFortuneParams): Promise<FortuneUserFortuneResponse> {
  let { data } = await apiAuth.get<BaseResponse<FortuneUserFortuneResponse>>('/api/fortune/user-fortune', {
    params,
  });
  return data;
}

/**
 * ### user history
 * "url"/api/fortune/user-history (GET)
 * @caution api auth
 */
export async function getFortuneUserHistory(params: FortuneUserHistoryParams): Promise<FortuneUserHistoryResponse> {
  let { data } = await apiAuth.get<BaseResponse<FortuneUserHistoryResponse>>('/api/fortune/user-history', {
    ...params,
  });
  return data;
}

/**
 * ### tasks
 * "url"/api/fortune/tasks (GET)
 * @caution api auth
 */
export async function getFortuneTasks(params: FortuneTasksParams): Promise<FortuneTasksResponse[]> {
  let { data } = await apiAuth.get<BaseResponse<FortuneTasksResponse[]>>('/api/fortune/tasks', {
    params,
  });
  return data;
}

/**
 * ### tasks store
 * "url"/api/fortune/tasks/store(POST)
 * @caution api auth
 */
export async function postFortuneTasksStore(params: FortuneTasksStoreParams): Promise<FortuneTasksStoreResponse> {
  let { data } = await apiAuth.post<BaseResponse<FortuneTasksStoreResponse>>('/api/fortune/tasks/store', {
    ...params,
  });
  return data;
}

/**
 * ### tasks claim
 * "url"/api/fortune/tasks/claim(POST)
 * @caution api auth
 */
export async function postFortuneTasksClaim(params: FortuneTasksClaimParams): Promise<FortuneTasksClaimResponse> {
  let { data } = await apiAuth.post<BaseResponse<FortuneTasksClaimResponse>>('/api/fortune/tasks/claim', {
    ...params,
  });
  return data;
}
