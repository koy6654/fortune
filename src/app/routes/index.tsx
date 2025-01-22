import { useEffect, useMemo } from 'react';

import { DailyCheckPage, HistoryPage, HomePage, IntroPage, InvitePage, TaskPage } from 'app/pages';
import { isPathAllowed } from 'common/libs';
import { DEFAULT_SERVICE_PATH, DEFAULT_FALLBACK_URL } from 'consts';
import { NotFound } from 'features/common';
import { RouteObject, useLocation, useNavigate, useRoutes } from 'react-router-dom';

const routes: RouteObject[] = [
  {
    path: `${DEFAULT_SERVICE_PATH}/`,
    element: <IntroPage start={true} />,
  },
  {
    path: `${DEFAULT_SERVICE_PATH}/intro`,
    element: <IntroPage start={true} />,
  },
  {
    path: `${DEFAULT_SERVICE_PATH}/home`,
    element: <HomePage />,
  },
  {
    path: `${DEFAULT_SERVICE_PATH}/home/home`,
    element: <HomePage />,
  },
  {
    path: `${DEFAULT_SERVICE_PATH}/home/daily-check`,
    element: <DailyCheckPage />,
  },
  {
    path: `${DEFAULT_SERVICE_PATH}/home/invite`,
    element: <InvitePage />,
  },
  {
    path: `${DEFAULT_SERVICE_PATH}/task`,
    element: <TaskPage />,
  },
  {
    path: `${DEFAULT_SERVICE_PATH}/history`,
    element: <HistoryPage />,
  },
  {
    path: `${DEFAULT_SERVICE_PATH}/history/history`,
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
        lists: ['/', `${DEFAULT_SERVICE_PATH}/`],
        method: 'endsWith',
      }),
    [pathname]
  );

  useEffect(() => {
    if (isNotAllowedPath) {
      navigate(DEFAULT_FALLBACK_URL);
    }
  }, [isNotAllowedPath, navigate, pathname]);

  return !isNotAllowedPath ? RoutesElement : null;
}

export default AppRoutes;
