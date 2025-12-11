import { NotFoundPage } from '@shared/pages/notFound';
import { createBrowserRouter } from 'react-router-dom';
import { dashboardRoutes } from 'src/modules/dashboard/routes/index.routes';
import { incomesRoutes } from 'src/modules/incomes/routes/index.routes';
import { loginRoutes } from '../modules/login/routes/index.routes';

const router = createBrowserRouter([
  ...loginRoutes,
  ...incomesRoutes,
  ...dashboardRoutes,
  {
    path: '*',
    element: <NotFoundPage />,
  },
]);

export { router };
