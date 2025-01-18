import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { BaseError } from 'common/apis';

import { postAuthTelegramUser, postFortuneDailyClaim, postFortuneUserHistory } from './service';
import {
  AuthParams,
  AuthResponse,
  DailyClaimParams,
  DailyClaimResponse,
  FortuneUserHistoryParams,
  FortuneUserHistoryResponse,
} from './service.model';

export const useAuthTelegramUser = () =>
  useMutation<AuthResponse, AxiosError<BaseError>, AuthParams>({
    mutationFn: (params: AuthParams) => postAuthTelegramUser(params),
  });

export const useFortuneDailyClaim = () =>
  useMutation<DailyClaimResponse, AxiosError<BaseError>, DailyClaimParams>({
    mutationFn: (params: DailyClaimParams) => postFortuneDailyClaim(params),
  });

export const useFortuneUserHistory = () =>
  useMutation<FortuneUserHistoryResponse, AxiosError<BaseError>, FortuneUserHistoryParams>({
    mutationFn: (params: FortuneUserHistoryParams) => postFortuneUserHistory(params),
  });
