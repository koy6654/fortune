import { useCallback, useEffect, useMemo, useRef } from 'react';
import { useAuthStore, useFortuneSyncStore } from '../store';
import { useTelegramInitData, useTelegramUISetting } from './useTelegram';
import { useAuthTelegramUser } from 'features/services/mutations';
import { AxiosError } from 'axios';
import { useFortuneSync } from 'features/services/queries';
import { LocalStorage } from 'common/libs/storageManager';
import { AuthParams, SyncResponse } from 'features/services/service.model';

export function useAuthorizationSetting() {
  useTelegramUISetting();

  const { token, setToken } = useAuthStore();
  const { setFortuneSync } = useFortuneSyncStore();

  const telegramInitData = useTelegramInitData();

  const promiseResolveRef = useRef<() => void>(() => {});
  const promiseRejectRef = useRef<(reason?: unknown) => void>(() => {});

  const waitForProcessCompletion = useMemo(
    () =>
      new Promise((resolve, reject) => {
        promiseResolveRef.current = () => {
          resolve(void 0);
        };
        promiseRejectRef.current = () => {
          reject(void 0);
        };
      }),
    []
  );

  const resolveProcessCompletion = useCallback(() => {
    promiseResolveRef.current();
  }, []);

  const rejectProcessCompletion = useCallback((reason: unknown) => {
    promiseRejectRef.current(reason);
  }, []);

  /** telegram data => get token */
  const { mutateAsync: mutateAuthTelegramUser } = useAuthTelegramUser();

  /** token => get user data */
  const { refetch: loadFortuneSync } = useFortuneSync({}, false);

  useEffect(() => {
    async function authenticate() {
      const { query_id, user, receiver, start_param, auth_date, hash } = telegramInitData;

      console.group(
        'useAuthorizationSetting [features/auth/hooks/useAuth.ts => app/bootstap/Bootstrap.tsx => App.tsx]'
      );

      try {
        if (user) {
          const localStorageToken = LocalStorage.get<string | null>('token');

          if (localStorageToken === null) {
            console.log('=== 최초 로그인 ===');

            const authParams: AuthParams = {
              telegram_id: user.id!,
              first_name: user.first_name!,
              last_name: user.last_name!,
              /** username, refferd_by 값이 없는경우 param에서 제외 */
              ...(user.usernames && { usernames: user.usernames }),
              ...(start_param?.replace('ref', '') && { referred_by: start_param.replace('ref', '') }),
            };
            console.log('[1] telegram data => authParams', authParams);

            const { token } = await mutateAuthTelegramUser(authParams);
            console.log('[2] API Post => token', token);

            setToken(token);
          } else {
            console.log('=== 재 로그인 ===');

            console.log('[1] token is exsist');
            console.log('[2] useAuthStore set =>', localStorageToken);

            setToken(localStorageToken);
          }

          const loadedFortuenSync: SyncResponse | undefined = (await loadFortuneSync()).data;

          if (loadedFortuenSync) {
            setFortuneSync(loadedFortuenSync);
            resolveProcessCompletion();
            console.log('[3] API Get => fortune sync', loadedFortuenSync);
          } else {
            rejectProcessCompletion('error');
          }
        }
      } catch (error: unknown) {
        if (error instanceof AxiosError) {
          console.error(error);
          rejectProcessCompletion(error);
        } else {
          rejectProcessCompletion(error);
        }
      }
      console.groupEnd();
    }
    authenticate();
  }, [
    loadFortuneSync,
    mutateAuthTelegramUser,
    rejectProcessCompletion,
    resolveProcessCompletion,
    setFortuneSync,
    setToken,
    telegramInitData,
  ]);

  return useCallback(async () => {
    await waitForProcessCompletion;
  }, [waitForProcessCompletion]);
}
