import { DEFAULT_NUM_ZERO } from 'consts';
import { DailyChecksResponse } from 'features/services/service.model';

export function getDailyCheckRestCount(fortuneDailyChecks: DailyChecksResponse | null): number {
  if (!fortuneDailyChecks) return DEFAULT_NUM_ZERO;
  return fortuneDailyChecks.filter((check) => check.completed !== 'done').length;
}
