import { Query, QueryCache, QueryClient, QueryFunctionContext, QueryKey } from '@tanstack/react-query';
import axios from 'axios';

function handleOnSuccess(data: unknown, query: Query<unknown, unknown, unknown, QueryKey>) {}

function handleOnError(error: unknown, query: Query<unknown, unknown, unknown, QueryKey>) {}

export const queryClient = new QueryClient({
  /**
   * tanstack Query v4부터 쿼리에 대한 onSuccess, onError 핸들러 콜백 사용이 deprecate 되어 다른 방안이 필요.
   * 그리고 훅을 사용하는 경우 컴포넌트에 사용중인 훅마다 에러에 대한 핸들링이 여러번 발생하는 문제가 있어 일관된 핸들링이 불가능함.
   *
   * @see {@link https://tkdodo.eu/blog/react-query-error-handling#the-global-callbacks}
   * @see {@link https://tkdodo.eu/blog/breaking-react-querys-api-on-purpose}
   */
  queryCache: new QueryCache({
    onSuccess: handleOnSuccess,
    onError: handleOnError,
  }),
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnMount: true,
      refetchOnWindowFocus: true,
      refetchOnReconnect: true,
      queryFn: async <T>({ queryKey }: QueryFunctionContext) => {
        const { data } = await axios.get<T>(`${queryKey[0]}`);
        return data;
      },
    },
  },
});
