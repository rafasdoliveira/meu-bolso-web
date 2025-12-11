import { SidebarButtonType } from '@shared/types/sidebarButtonType';
import { GiPayMoney } from 'react-icons/gi';
import { TbPigMoney } from 'react-icons/tb';

const SideBarButtonsIncomes: SidebarButtonType[] = [
  {
    label: 'Receitas',
    disabled: false,
    icon: <GiPayMoney />,
    items: [
      {
        icon: <GiPayMoney />,
        title: 'Minhas Receitas',
        path: '/receitas',
      },
      {
        icon: <GiPayMoney />,
        title: 'Cadastro de Receitas',
        path: '/receitas-cadastro',
      },
    ],
    path: '/receitas',
  },
  {
    label: 'Investimentos',
    disabled: false,
    icon: <TbPigMoney />,
    items: [
      {
        icon: <GiPayMoney />,
        title: 'Meus Investimentos',
        path: '/investimentos/',
      },
      {
        icon: <GiPayMoney />,
        title: 'Renda Fixa',
        path: '/investimentos/renda-fixa',
      },
      {
        icon: <GiPayMoney />,
        title: 'Ações',
        path: '/receitas-listagem',
      },
      {
        icon: <GiPayMoney />,
        title: 'Fundos Imobiliários',
        path: '/receitas-listagem',
      },
    ],
    path: '',
  },
];

export { SideBarButtonsIncomes };
