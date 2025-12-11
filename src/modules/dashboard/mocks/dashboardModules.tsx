import { DashboardModule } from '../types/dashboardModulesType';
import {
  CreditCard,
  Target,
  ArrowUpCircle,
  ArrowDownCircle,
} from 'lucide-react';

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
    {
      title: 'Cartões',
      description: 'Cadastre seus cartões e acompanha de perto.',
      path: '/cartoes',
      disabled: false,
      permission: 'A',
      moduleAction: [],
      icon: <CreditCard />,
    },
    {
      title: 'Objetivos',
      description: 'Trace metas e crie objetivos.',
      path: '/objetivos',
      disabled: false,
      permission: 'A',
      moduleAction: [],
      icon: <Target />,
    },
  ];
  return {
    modules,
  };
};

export { dashboardModules };
