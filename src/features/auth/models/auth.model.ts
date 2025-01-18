import { SyncResponse, UserType } from 'features/services/service.model';

export interface AuthState {
  token: string | null;
  setToken: (token: string) => void;
  clearToken: () => void;
}

export interface FortuneSyncState {
  user: UserType | null;
  isFortune: boolean;
  fortuneIndex: number;
  setFortuneSync: (fortuneSync: SyncResponse) => void;
}
