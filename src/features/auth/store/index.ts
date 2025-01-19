import { injectStore } from 'common/apis';
import { create } from 'zustand';
import { AuthState, FortuneSyncState } from '../models/auth.model';
import { DEFAULT_FORTUNESYNC_FORTUNEINDEX } from 'consts/fortune';
import { SyncResponse } from 'features/services/service.model';

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  setToken: (token) => set({ token }),
  clearToken: () => set({ token: null }),
}));

export const useFortuneSyncStore = create<FortuneSyncState>((set) => ({
  user: null,
  isFortune: false,
  fortuneIndex: DEFAULT_FORTUNESYNC_FORTUNEINDEX,
  setFortuneSync: ({ user, isFortune, fortuneIndex }: SyncResponse) => set({ user, isFortune, fortuneIndex }),
}));

injectStore(useAuthStore);
