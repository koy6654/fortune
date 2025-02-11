import { injectStore } from 'common/apis';
import { create } from 'zustand';
import { AuthState, FortuneSyncState } from '../models/auth.model';
import { SyncResponse } from 'features/services/service.model';
import { LocalStorage } from 'common/libs/storageManager';
import { DEFAULT_NUM_ZERO } from 'consts';

export const useAuthStore = create<AuthState>((set, get) => ({
  token: null,
  setToken: (token) => {
    set({ token });
    if (token) {
      LocalStorage.set('token', token);
    }
  },
  getToken: () => get().token,
  clearToken: () => {
    set({ token: null });
    LocalStorage.remove('token');
  },
}));

export const useFortuneSyncStore = create<FortuneSyncState>((set) => ({
  user: null,
  isFortune: false,
  fortuneIndex: DEFAULT_NUM_ZERO,
  setFortuneSync: ({ user, isFortune, fortuneIndex }: SyncResponse) => set({ user, isFortune, fortuneIndex }),
}));

injectStore(useAuthStore);
