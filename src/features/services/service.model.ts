import { FortuneTasksType } from 'features/task';
import { TelegramWebApps } from 'telegram-webapps-types';

export type UserType = {
  id: TelegramWebApps.WebAppUser['id'];
  telegram_id: number;
  first_name: TelegramWebApps.WebAppUser['first_name'];
  last_name: TelegramWebApps.WebAppUser['last_name'];
  username: string;
  wallet: string | null;
  balance: number;
  fortune: number | null;
  referred_by: number | string;
  login_streak: number;
  production_per_hour: number;
  last_login_date: string | null;
  created_at: string;
  updated_at: string;
  last_login_round: string | null;
};

export type AuthParams = {
  telegram_id: UserType['telegram_id'];
  first_name: UserType['first_name'];
  last_name: UserType['last_name'];
  usernames?: TelegramWebApps.WebAppUser['usernames'];
  referred_by?: UserType['referred_by'];
};

export interface AuthResponse {
  token: string;
}

export interface SyncParams {}

export interface SyncResponse {
  user: UserType;
  isFortune: boolean;
  fortuneIndex: number;
}

export interface DailyChecksParams {}
export interface DailyCheckData {
  id: number;
  name: string;
  required_login_streak: number;
  reward_coins: number;
  created_at: string;
  updated_at: string;
  completed: 'done' | null;
  available: boolean;
}
export type DailyChecksResponse = DailyCheckData[];

export interface DailyClaimParams {}
export interface DailyClaimResponse {
  success: boolean;
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
  scrollMessages: {
    id: number;
    default_message: string;
    message: string | null;
    created_at: string;
    updated_at: string;
  }[];
  startDate: string;
}

export interface FortuneTasksParams {
  type: FortuneTasksType;
}

export interface FortuneTasksResponse {
  id: number;
  name: string;
  description: string;
  reward_coins: number;
  type: FortuneTasksType;
  action_name: string;
  link: string;
  created_at: string;
  updated_at: string;
  image: string | null;
  is_submitted: boolean | null;
  is_rewarded: boolean | null;
  submitted_at: string | null;
}

export interface FortuneTasksStoreParams {
  taskid: number;
}

export interface FortuneTasksStoreResponse {
  success: boolean;
  message: string;
}

export interface FortuneTasksClaimParams {
  taskid: number;
}

export interface FortuneTasksClaimResponse {
  success: boolean;
  message: string;
}
