import { AppProviders } from 'app/providers';
import AppRoutes from 'app/routes';
import { useAuthStore, useTelegramInitData, useTelegramUISetting } from 'features/auth';
import { postAuthTelegramUser } from 'features/services/service';
import { Layout } from 'layout';
import { useCallback, useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { TelegramWebApps } from 'telegram-webapps-types';

function App() {
  const [initialized, setInitialized] = useState(false);

  useTelegramUISetting();

  const { token, setToken } = useAuthStore();

  console.log('app');
  const { query_id, user, receiver, start_param, auth_date, hash } = useTelegramInitData();

  /** app 구동을 위한 필수 프로세스 */
  const bootstrap = useCallback(
    async (user: TelegramWebApps.WebAppUser | undefined) => {
      if (!initialized) {
        try {
          if (!user) return;
          console.log(user);

          // 로그인 signIn
          setToken('my-token');

          // 싱크 sync
          // data => useStore.setState(data...)
          postAuthTelegramUser({
            telegram_id: 1,
            first_name: 'test',
            last_name: 'test',
            username: 'test',
            referred_by: 5,
          });

          setInitialized(true);
        } catch (error) {
          console.error(error);
        }
      }
    },
    [initialized, setToken]
  );

  useEffect(() => {
    bootstrap(user);
  }, [bootstrap, user]);

  useEffect(() => {
    console.log(token);
  }, [token]);

  if (!initialized) {
    return <>Loading...</>;
  }

  return (
    <AppProviders>
      <BrowserRouter>
        <Layout>
          <AppRoutes />
        </Layout>
      </BrowserRouter>
    </AppProviders>
  );
}

export default App;
