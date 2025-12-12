import { SidebarButtonType } from '@shared/types/sidebarButtonType';
import { CreditCard } from 'lucide-react';

const SideBarButtonsCards: SidebarButtonType[] = [
  {
    label: 'Cartões',
    disabled: false,
    icon: <CreditCard />,
    path: '/cartoes',
  },
];

export { SideBarButtonsCards };
