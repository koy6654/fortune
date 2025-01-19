import { create } from 'zustand';
import { FortuneDailyChecksState } from '../models/home.model';
import { DailyChecksResponse } from 'features/services/service.model';

export const useFortuneDailyChecksStore = create<FortuneDailyChecksState>((set) => ({
  fortuneDailyChecks: null,
  setFortuneDailyChecks: (checks: DailyChecksResponse) => set({ fortuneDailyChecks: checks }),
}));
