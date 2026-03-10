import { SidebarButtonType } from '@shared/types/sidebarButtonType';
import { ArrowDownCircle } from 'lucide-react';
import { GiPayMoney } from 'react-icons/gi';

const SideBarButtonsExpenses: SidebarButtonType[] = [
  {
    label: 'Despesas',
    disabled: false,
    icon: <ArrowDownCircle />,
    items: [
      {
        icon: <GiPayMoney />,
        title: 'Minhas Despesas',
        path: '/despesas',
      },
    ],
    path: '/despesas',
  },
];

export { SideBarButtonsExpenses };
