import { useQuery } from '@tanstack/react-query';
import {
  DailyChecksParams,
  FortuneTasksParams,
  FortuneUserFortuneParams,
  ReferredUsersParams,
  SyncParams,
} from './service.model';

import { USE_MOCK } from 'consts';

import * as mockService from './service.mock';
import * as realService from './service';

const service = USE_MOCK ? mockService : realService;
const {
  getFortuneDailyChecks,
  getFortuneSync,
  getFortuneUserFortune,
  getReferredUsers,
  getFortuneUserHistory,
  getFortuneTasks,
} = service;

export const useFortuneSync = (param: SyncParams, enabled = true) => {
  const query = useQuery({
    queryKey: ['sync', param],
    queryFn: () => getFortuneSync(param),
    enabled,
  });
  return query;
};

export const useFortuneDailyChecks = (param: DailyChecksParams, enabled = true) => {
  const query = useQuery({
    queryKey: ['dailyCheck', param],
    queryFn: () => getFortuneDailyChecks(param),
    enabled,
  });
  return query;
};

export const useRefferredUsers = (param: ReferredUsersParams, enabled = true) => {
  const query = useQuery({
    queryKey: ['refferedUsers', param],
    queryFn: () => getReferredUsers(param),
    enabled,
  });
  return query;
};

export const useFortuneUserFortune = (param: FortuneUserFortuneParams, enabled = true) => {
  const query = useQuery({
    queryKey: ['userFortune', param],
    queryFn: () => getFortuneUserFortune(param),
    enabled,
  });
  return query;
};

export const useFortuneUserHistory = (param: FortuneUserFortuneParams, enabled = true) => {
  const query = useQuery({
    queryKey: ['userHistory', param],
    queryFn: () => getFortuneUserHistory(param),
    enabled,
  });
  return query;
};

export const useFortuneTasks = (param: FortuneTasksParams, enabled = true) => {
  const query = useQuery({
    queryKey: ['tasks', param],
    queryFn: () => getFortuneTasks(param),
    enabled,
  });
  return query;
};
