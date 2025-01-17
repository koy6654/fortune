import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { BaseError, BaseResponse } from 'common/apis';
import { AuthParams } from 'features/auth';
import { postAuthTelegramUser } from './service';

export const useAuthTelegramUser = () =>
  useMutation<BaseResponse, AxiosError<BaseError>, AuthParams>({
    mutationFn: (params: AuthParams) => postAuthTelegramUser(params),
  });
