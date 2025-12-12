import { NotFoundPage } from '@shared/pages/notFound';
import { createBrowserRouter } from 'react-router-dom';
import { cardsRoutes } from 'src/modules/cards/routes/index.routes';
import { dashboardRoutes } from 'src/modules/dashboard/routes/index.routes';
import { expensesRoutes } from 'src/modules/expenses/routes/index.routes';
import { goalsRoutes } from 'src/modules/goals/routes/index.routes';
import { incomesRoutes } from 'src/modules/incomes/routes/index.routes';
import { loginRoutes } from '../modules/login/routes/index.routes';

const router = createBrowserRouter([
  ...loginRoutes,
  ...cardsRoutes,
  ...goalsRoutes,
  ...incomesRoutes,
  ...expensesRoutes,
  ...dashboardRoutes,
  {
    path: '*',
    element: <NotFoundPage />,
  },
]);

export { router };
