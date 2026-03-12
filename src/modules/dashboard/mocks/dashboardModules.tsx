import {
  ArrowDownCircle,
  ArrowUpCircle
} from 'lucide-react';
import { DashboardModule } from '../types/dashboardModulesType';

const dashboardModules = () => {
  const modules: DashboardModule[] = [
    {
      title: 'Receitas',
      description: 'Acompanhe suas receitas.',
      path: '/receitas',
      disabled: false,
      permission: 'A',
      moduleAction: [],
      icon: <ArrowUpCircle />,
    },
    {
      title: 'Despesas',
      description: 'Acompanhe suas despesas.',
      path: '/despesas',
      disabled: false,
      permission: 'A',
      moduleAction: [],
      icon: <ArrowDownCircle />,
    },
  ];
  return {
    modules,
  };
};

export { dashboardModules };
