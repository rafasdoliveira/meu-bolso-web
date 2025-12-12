import { SidebarButtonType } from '@shared/types/sidebarButtonType';
import { Target } from 'lucide-react';

const SideBarButtonsGoals: SidebarButtonType[] = [
  {
    label: 'Objetivos',
    disabled: false,
    icon: <Target />,
    path: '/cartoes',
  },
];

export { SideBarButtonsGoals };
