import { BaseResponse } from 'common/apis';

export interface AuthState {
  token: string | null;
  setToken: (token: string) => void;
  clearToken: () => void;
}

export interface AuthParams {
  telegram_id: number;
  first_name: string;
  last_name: string;
  username: string;
  referred_by: number;
}

export interface AuthResponse {
  token: string;
}
