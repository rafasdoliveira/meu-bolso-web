import { RouteObject } from 'react-router-dom';
import { DashBoardPage } from '../pages';

const dashboardRoutes: RouteObject[] = [
  {
    path: '/dashboard',
    element: <DashBoardPage />,
  },
];

export { dashboardRoutes };
