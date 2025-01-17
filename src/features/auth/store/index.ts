import { injectStore } from 'common/apis';
import { create } from 'zustand';
import { AuthState } from '../models/auth.model';

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  setToken: (token) => set({ token }),
  clearToken: () => set({ token: null }),
}));

injectStore(useAuthStore);
