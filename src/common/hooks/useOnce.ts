import { useCallback, useRef } from 'react';

type UpdateFunction = () => boolean;

export interface updateOnceParams<T> {
  identifier: T;
  updateFunction: UpdateFunction;
  maxRetryCount?: number;
  retryIntervalMs?: number;
}

export const useOnce = <T>() => {
  const prevIdentifierRef = useRef<T | null>(null);

  const updateOnce = useCallback(
    ({ identifier, updateFunction, maxRetryCount = 10, retryIntervalMs = 100 }: updateOnceParams<T>) => {
      if (prevIdentifierRef.current === identifier) return;

      let retryCount = 0;

      // do
      const updateWithRetry = () => {
        if (updateFunction()) {
          prevIdentifierRef.current = identifier;
          return true;
        }
        return false;
      };

      const isUpdated = updateWithRetry();

      // while
      if (!isUpdated) {
        const intervalId = setInterval(() => {
          if (retryCount > maxRetryCount) {
            clearInterval(intervalId);
            retryCount = 0;
          }
          if (updateWithRetry()) {
            clearInterval(intervalId);
            retryCount = 0;
          }
          retryCount += 1;
        }, retryIntervalMs);
      }
    },
    []
  );

  return { updateOnce };
};
