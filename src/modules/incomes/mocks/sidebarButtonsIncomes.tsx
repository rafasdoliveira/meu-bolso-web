import { SidebarButtonType } from '@shared/types/sidebarButtonType';
import { ArrowUpCircle } from 'lucide-react';

const SideBarButtonsIncomes: SidebarButtonType[] = [
  {
    label: 'Receitas',
    disabled: false,
    icon: <ArrowUpCircle />,
    path: '/receitas',
  },
];

export { SideBarButtonsIncomes };
