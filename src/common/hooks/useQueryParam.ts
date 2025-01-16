import { useMemo } from 'react';

import { useLocation } from 'react-router-dom';

export function useQueryParams(): Record<string, string> {
  const { search } = useLocation();

  return useMemo(() => Object.fromEntries(new URLSearchParams(search)), [search]);
}
