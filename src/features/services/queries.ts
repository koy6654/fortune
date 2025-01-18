import { useQuery } from '@tanstack/react-query';
import { DailyChecksParams, FortuneUserFortuneParams, ReferredUsersParams, SyncParams } from './service.model';
import { getFortuneDailyCheck, getFortuneSync, getFortuneUserFortune, getReferredUsers } from './service';

export const useFortuneSync = (param: SyncParams = {}, enabled = true) => {
  const query = useQuery({
    queryKey: ['sync', param],
    queryFn: () => getFortuneSync(param),
    enabled,
  });
  return query;
};

export const useFortuneDailyCheck = (param: DailyChecksParams = {}, enabled = true) => {
  const query = useQuery({
    queryKey: ['dailyCheck', param],
    queryFn: () => getFortuneDailyCheck(param),
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
