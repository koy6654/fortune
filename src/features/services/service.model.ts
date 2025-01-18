import { AuthParams } from 'features/auth';

type UserType = {
  id: number;
  telegram_id: number;
  first_name: string;
  last_name: string;
  username: string | null;
  wallet: string | null;
  balance: number;
  fortune: number | null;
  referred_by: number;
  login_streak: number;
  production_per_hour: number;
  last_login_date: string | null;
  created_at: string;
  updated_at: string;
  last_login_round: string | null;
};

export interface SyncParams {}

export interface SyncResponse {
  user: UserType;
  isFortune: true;
  fortuneIndex: number;
}

export interface DailyChecksParams {}
interface DailyCheckData {
  id: number;
  name: string;
  required_login_streak: number;
  reward_coins: number;
  created_at: string;
  updated_at: string;
  completed: 'done' | null;
  available: false;
}
export type DailyChecksResponse = DailyCheckData[];

export interface DailyClaimParams {}
export interface DailyClaimResponse {
  success: true;
  message: string;
  balance: number;
}

export interface ReferredUsersParams {
  page: number;
}

export interface ReferredUsersResponse {
  data: UserType[];
  links: {
    first: string | null;
    last: string | null;
    prev: string | null;
    next: string | null;
  };

  meta: {
    current_page: number;
    from: number;
    last_page: number;
    links: {
      url: string;
      label: string;
      active: boolean;
    }[];
    path: string;
    per_page: number;
    to: number;
    total: number;
  };
}

export interface FortuneUserFortuneParams {}

export interface FortuneUserFortuneResponse {
  'fortune-message': string;
}

export interface FortuneUserHistoryParams {}

export interface FortuneUserHistoryResponse {
  fortuneMessages: {
    id: number;
    default_message: string;
    message: string | null;
  }[];
  startDate: string;
}
