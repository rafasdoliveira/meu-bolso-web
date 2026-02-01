import { SidebarButtonType } from '@shared/types/sidebarButtonType';
import { ArrowUpCircle, ChartNoAxesGantt } from 'lucide-react';

const SideBarButtonsIncomes: SidebarButtonType[] = [
  {
    label: 'Receitas',
    disabled: false,
    icon: <ArrowUpCircle />,
    path: '/receitas',
  },
  {
    label: 'Fontes de Receita',
    disabled: false,
    icon: <ChartNoAxesGantt />,
    path: '/fontes-receita',
  },
];

export { SideBarButtonsIncomes };
