import { useQuery } from '@tanstack/react-query';
import { DailyChecksParams, FortuneUserFortuneParams, ReferredUsersParams, SyncParams } from './service.model';
import { getFortuneDailyChecks, getFortuneSync, getFortuneUserFortune, getReferredUsers } from './service';

export const useFortuneSync = (param: SyncParams = {}, enabled = true) => {
  const query = useQuery({
    queryKey: ['sync', param],
    queryFn: () => getFortuneSync(param),
    enabled,
  });
  return query;
};

export const useFortuneDailyChecks = (param: DailyChecksParams = {}, enabled = true) => {
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

export const useFortuneUserFortune = (param: FortuneUserFortuneParams = {}, enabled = true) => {
  const query = useQuery({
    queryKey: ['userFortune', param],
    queryFn: () => getFortuneUserFortune(param),
    enabled,
  });
  return query;
};
