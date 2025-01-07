import { ReactNode } from 'react';

import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { store } from 'app';
import { persistor } from 'app/store';
import { generateFingerprint } from 'common/libs/\bfingerprint';
import { USE_DEV_MODE } from 'consts';
import { configureI18n } from 'features/locale';
import { ThemeProvider } from 'features/theme';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { queryClient } from './queryClient';
import { WebSocketPrivateProvider } from './WebSocketPrivateContext';
import { WebSocketPublicProvider } from './WebSocketPublicContext';

interface AppProviderProps {
  children: ReactNode;
}

export function AppProviders({ children }: AppProviderProps) {
  const onBeforeLiftCallback = async () => {
    await generateFingerprint();
    await configureI18n();
  };

  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor} onBeforeLift={onBeforeLiftCallback}>
          <WebSocketPublicProvider>
            <WebSocketPrivateProvider>
              <ThemeProvider>{children}</ThemeProvider>
              {USE_DEV_MODE ? <ReactQueryDevtools initialIsOpen={false} /> : null}
            </WebSocketPrivateProvider>
          </WebSocketPublicProvider>
        </PersistGate>
      </Provider>
    </QueryClientProvider>
  );
}
