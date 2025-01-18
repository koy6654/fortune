import { useAuthorizationSetting } from 'features/auth/hooks/useAuth';
import { ReactNode, useCallback, useEffect, useState } from 'react';

interface BootstrapProps {
  children: ReactNode;
}

export function Bootstrap({ children }: BootstrapProps) {
  const [initialized, setInitialized] = useState(false);

  const loadAuthentication = useAuthorizationSetting();

  /** app 구동을 위한 필수 프로세스 */
  const bootstrap = useCallback(async () => {
    if (!initialized) {
      try {
        await loadAuthentication();
        setInitialized(true);
      } catch (error) {
        console.error(error);
        setInitialized(false);
      }
    }
  }, [initialized, loadAuthentication]);

  useEffect(() => {
    bootstrap();
  }, [bootstrap]);

  if (!initialized) {
    return <>Loading...</>;
  }

  return <>{children}</>;
}
