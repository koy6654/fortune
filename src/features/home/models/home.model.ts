import { DailyChecksResponse } from 'features/services/service.model';

export interface FortuneDailyChecksState {
  fortuneDailyChecks: DailyChecksResponse | null;
  setFortuneDailyChecks: (checks: DailyChecksResponse) => void;
}
