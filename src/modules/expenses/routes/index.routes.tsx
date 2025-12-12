import { RouteObject } from 'react-router-dom';
import { Expenses } from '../pages';

const expensesRoutes: RouteObject[] = [
  {
    path: '/despesas',
    element: <Expenses />,
  },
];

export { expensesRoutes };
