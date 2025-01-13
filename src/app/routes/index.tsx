import { useEffect, useMemo } from 'react';

import {
  BasicPage,
  DailyCheckPage,
  HistoryPage,
  HomePage,
  IntroPage,
  InvitePage,
  OnChainPage,
  SocialPage,
} from 'app/pages';
import { isPathAllowed } from 'common/libs';
import { DEFAULT_SERVICE_PATH, DEFAULT_ROUTES_PATH, DEFAULT_FALLBACK_URL } from 'consts';
import { NotFound } from 'features/common';
import { RouteObject, useLocation, useNavigate, useRoutes } from 'react-router-dom';

const routes: RouteObject[] = [
  {
    path: `${DEFAULT_ROUTES_PATH}/`,
    element: <IntroPage />,
  },
  {
    path: `${DEFAULT_ROUTES_PATH}/intro`,
    element: <IntroPage />,
  },
  {
    path: `${DEFAULT_ROUTES_PATH}/home`,
    element: <HomePage />,
  },
  {
    path: `${DEFAULT_ROUTES_PATH}/home/home`,
    element: <HomePage />,
  },
  {
    path: `${DEFAULT_ROUTES_PATH}/home/daily-check`,
    element: <DailyCheckPage />,
  },
  {
    path: `${DEFAULT_ROUTES_PATH}/home/invite`,
    element: <InvitePage />,
  },
  {
    path: `${DEFAULT_ROUTES_PATH}/task`,
    element: <SocialPage />,
  },
  {
    path: `${DEFAULT_ROUTES_PATH}/task/social`,
    element: <SocialPage />,
  },
  {
    path: `${DEFAULT_ROUTES_PATH}/task/basic`,
    element: <BasicPage />,
  },
  {
    path: `${DEFAULT_ROUTES_PATH}/task/on-chain`,
    element: <OnChainPage />,
  },
  {
    path: `${DEFAULT_ROUTES_PATH}/history`,
    element: <HistoryPage />,
  },
  {
    path: `${DEFAULT_ROUTES_PATH}/history/history`,
    element: <HistoryPage />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
];

function AppRoutes() {
  const RoutesElement = useRoutes(routes);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const isNotAllowedPath = useMemo(
    () =>
      isPathAllowed({
        pathname,
        lists: ['/', DEFAULT_ROUTES_PATH, `${DEFAULT_SERVICE_PATH}/`, `${DEFAULT_ROUTES_PATH}/`],
        method: 'endsWith',
      }),
    [pathname]
  );

  // useEffect(() => {
  //   if (isNotAllowedPath) {
  //     navigate(DEFAULT_FALLBACK_URL);
  //   }
  // }, [isNotAllowedPath, navigate, pathname]);

  // return !isNotAllowedPath ? RoutesElement : null;
  return RoutesElement;
}

export default AppRoutes;
