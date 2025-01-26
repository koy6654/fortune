import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { BaseError } from 'common/apis';

import {
  AuthParams,
  AuthResponse,
  DailyClaimParams,
  DailyClaimResponse,
  FortuneTasksClaimParams,
  FortuneTasksClaimResponse,
  FortuneTasksStoreParams,
  FortuneTasksStoreResponse,
} from './service.model';

import { USE_MOCK } from 'consts';

import * as mockService from './service.mock';
import * as realService from './service';

const service = USE_MOCK ? mockService : realService;
const { postAuthTelegramUser, postFortuneDailyClaim, postFortuneTasksStore, postFortuneTasksClaim } = service;

export const useAuthTelegramUser = () =>
  useMutation<AuthResponse, AxiosError<BaseError>, AuthParams>({
    mutationFn: (params: AuthParams) => postAuthTelegramUser(params),
  });

export const useFortuneDailyClaim = () =>
  useMutation<DailyClaimResponse, AxiosError<BaseError>, DailyClaimParams>({
    mutationFn: (params: DailyClaimParams) => postFortuneDailyClaim(params),
  });

export const useFortuneTasksStore = () =>
  useMutation<FortuneTasksStoreResponse, AxiosError<BaseError>, FortuneTasksStoreParams>({
    mutationFn: (params: FortuneTasksStoreParams) => postFortuneTasksStore(params),
  });

export const useFortuneTasksClaim = () =>
  useMutation<FortuneTasksClaimResponse, AxiosError<BaseError>, FortuneTasksClaimParams>({
    mutationFn: (params: FortuneTasksClaimParams) => postFortuneTasksClaim(params),
  });
