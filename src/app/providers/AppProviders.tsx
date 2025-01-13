import { ReactNode } from 'react';

import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { USE_DEV_MODE } from 'consts';

import { queryClient } from './queryClient';

interface AppProviderProps {
  children: ReactNode;
}

export function AppProviders({ children }: AppProviderProps) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {USE_DEV_MODE ? <ReactQueryDevtools initialIsOpen={false} /> : null}
    </QueryClientProvider>
  );
}
