import { RouteObject } from 'react-router-dom';
import { ReceitasPage } from '../pages';
import { SourcesPage } from '../submodules/sources/page';

const incomesRoutes: RouteObject[] = [
  {
    path: '/receitas',
    element: <ReceitasPage />,
  },
  {
    path: '/fontes-receita',
    element: <SourcesPage />,
  },
];

export { incomesRoutes };
