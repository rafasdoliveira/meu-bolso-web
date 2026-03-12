import { SidebarButtonType } from '@shared/types/sidebarButtonType';
import { ArrowDownCircle, CreditCard, Receipt, Tag } from 'lucide-react';

const SideBarButtonsExpenses: SidebarButtonType[] = [
  {
    label: 'Despesas',
    disabled: false,
    icon: <ArrowDownCircle />,
    path: '/despesas',
  },
  {
    label: 'Categorias de Despesa',
    disabled: false,
    icon: <Tag />,
    path: '/categorias-despesas',
  },
  {
    label: 'Métodos de Pagamento',
    disabled: false,
    icon: <CreditCard />,
    path: '/metodos-pagamento',
  },
  {
    label: 'Faturas',
    disabled: false,
    icon: <Receipt />,
    path: '/faturas',
  },
];

export { SideBarButtonsExpenses };
