import { RouteObject } from 'react-router-dom';
import { Expenses } from '../pages';
import { ExpenseCategories } from '../submodules/expenseCategories/pages';
import { PaymentMethods } from '../submodules/paymentMethods/pages';
import { Invoices } from '../submodules/invoices/pages';

const expensesRoutes: RouteObject[] = [
  {
    path: '/despesas',
    element: <Expenses />,
  },
  {
    path: '/categorias-despesas',
    element: <ExpenseCategories />,
  },
  {
    path: '/metodos-pagamento',
    element: <PaymentMethods />,
  },
  {
    path: '/faturas',
    element: <Invoices />,
  },
];

export { expensesRoutes };
