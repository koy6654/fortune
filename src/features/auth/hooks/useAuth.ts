import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useAuthStore } from '../store';
import { useTelegramInitData, useTelegramUISetting } from './useTelegram';
import { useAuthTelegramUser } from 'features/services/mutations';
import { AxiosError } from 'axios';
import { useFortuneSync } from 'features/services/queries';

export function useAuthorizationSetting() {
  useTelegramUISetting();

  const { token, setToken } = useAuthStore();

  const { query_id, user, receiver, start_param, auth_date, hash } = useTelegramInitData();

  const [isInitializedAuth, setIsInitializedAuth] = useState(false);

  const promiseResolveRef = useRef<() => void>(() => {});
  const waitForProcessCompletion = useMemo(
    () =>
      new Promise((resolve) => {
        promiseResolveRef.current = () => {
          resolve(void 0);
        };
      }),
    []
  );

  const { mutateAsync: mutateAuthTelegramUser } = useAuthTelegramUser();

  const { data: loadedFortuneSyncData, refetch: loadFortuneSync } = useFortuneSync(false);

  // const isExistAuthToken = authToken ? !!authToken.accessToken : false;

  // const { refetch: loadAccountProfile } = useAccountProfile(false);

  const resolveProcessCompletion = useCallback(() => {
    promiseResolveRef.current();
  }, []);

  // useEffect(() => {
  //   if (isInitializedAuth) {
  //     if (isExistAuthToken === false) {
  //       window.location.href = `${landingHost}${DEFAULT_FALLBACK_URL}`;
  //       return;
  //     }

  //     if (authToken && authToken.accessToken) {
  //       dispatch(setAuthToken(authToken));

  //       /**
  //        * TODO: 이 부분 isSocketPrivateConnected 에 대해서 고민해봐야 함
  //        * - 현재 소켓 객체가 존재하고 && private ws 가 연결이 되었을 경우에만 토큰을 갱신하고 있음
  //        * - 문제의 케이스는 다음과 같음
  //        *    - 만약 소켓 연결이 끊어진 상태에서, JWT가 갱신되었다면
  //        *    - private ws 재연결 동작이 이루어질 때, 이전 토큰을 가지고 인증처리 시도를 할 확률이 있음
  //        */
  //       if (socketPrivate && isSocketPrivateConnected) {
  //         socketPrivate.loginToken = authToken.accessToken;
  //       }
  //     }
  //   }
  // }, [
  //   authToken,
  //   dispatch,
  //   socketPrivate,
  //   isSocketPrivateConnected,
  //   isInitializedAuth,
  //   isExistAuthToken,
  // ]);

  useEffect(() => {
    async function authenticate() {
      if (!user) return;
      console.log(user);

      // 1. 토큰 있는지 검사

      // 2. AuthParams 만들기
      const authParams = {
        telegram_id: 1,
        first_name: 'test',
        last_name: 'test',
        username: 'test',
        referred_by: 5,
      };

      try {
        const response = await mutateAuthTelegramUser(authParams);

        // 3. 성공 후 => 토큰 저장
        // 로그인 signIn
        setToken('my-token');

        // 4. useFortuneSync 로 유저 정보 싱크 맞추기
        await loadFortuneSync();

        // 5. 최종 성공 시
        resolveProcessCompletion();
      } catch (error: unknown) {
        if (error instanceof AxiosError) {
          console.error(error);
        }
      }
    }
    authenticate();
  }, [loadFortuneSync, mutateAuthTelegramUser, resolveProcessCompletion, setToken]);

  return useCallback(async () => {
    await waitForProcessCompletion;
  }, [waitForProcessCompletion]);
}
