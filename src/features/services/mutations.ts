import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { BaseError, BaseResponse } from 'common/apis';
import { AuthParams, AuthResponse } from 'features/auth';
import { postAuthTelegramUser, postFortuneDailyClaim, postFortuneUserHistory } from './service';
import {
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
