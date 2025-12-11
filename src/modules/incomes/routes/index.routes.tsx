import { RouteObject } from 'react-router-dom';
import { ReceitasPage } from '../pages';

const incomesRoutes: RouteObject[] = [
  {
    path: '/receitas',
    element: <ReceitasPage />,
  },
];

export { incomesRoutes };
