import { AppProviders } from 'app/providers';
import AppRoutes from 'app/routes';
import { Layout } from 'layout';
import { useCallback, useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';

function App() {
  const [initialized, setInitialized] = useState(false);

  /** app 구동을 위한 필수 프로세스 */
  const bootstrap = useCallback(async () => {
    try {
      setInitialized(true);
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    bootstrap();
  }, [bootstrap]);

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
