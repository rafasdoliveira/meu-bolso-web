import { RouteObject } from 'react-router-dom';
import { GoalsPage } from '../pages';

const goalsRoutes: RouteObject[] = [
  { path: '/objetivos', element: <GoalsPage /> },
];

export { goalsRoutes };
