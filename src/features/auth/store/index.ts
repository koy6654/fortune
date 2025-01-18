import { injectStore } from 'common/apis';
import { create } from 'zustand';
import { AuthState, FortuneSyncState } from '../models/auth.model';

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  setToken: (token) => set({ token }),
  clearToken: () => set({ token: null }),
}));

export const useFortuneSyncStore = create<FortuneSyncState>((set) => ({
  user: null,
  isFortune: false,
  fortuneIndex: 0,
  setFortuneSync: ({ user, isFortune, fortuneIndex }) => set({ user, isFortune, fortuneIndex }),
}));

injectStore(useAuthStore);
