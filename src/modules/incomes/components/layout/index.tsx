import { Layout } from '@shared/components/layout/index';
import { BreadcrumbType } from '@shared/types/breadcrumbType';
import { ScrollArea } from '@shared/components/ui/scroll-area';
import { SideBarButtonsIncomes } from '../../mocks/sidebarButtonsIncomes';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

type Props = {
  children: React.ReactNode;
};

function IncomesLayout({ children }: Readonly<Props>) {
  const location = useLocation();

  const [breadcrumbs, setBreadcrumbs] = useState<BreadcrumbType[]>([
    { label: 'DashBoard', path: '/dashboard' },
    { label: 'Receitas', path: '/receitas' },
  ]);

  const handleBreadcrumbs = () => {
    const currentPath = location.pathname;

    if (currentPath === '/receitas') return;

    for (const { label, path } of SideBarButtonsIncomes) {
      if (
        path === currentPath &&
        !breadcrumbs.some((item) => item.label === label)
      ) {
        if (breadcrumbs.length > 1) {
          setBreadcrumbs([breadcrumbs[0], { label, path }]);
          return;
        }
        setBreadcrumbs([...breadcrumbs, { label, path }]);
      }
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    handleBreadcrumbs();
  }, [location]);

  return (
    <Layout breadcrumbs={breadcrumbs} sidebarButton={SideBarButtonsIncomes}>
      <ScrollArea>{children}</ScrollArea>
    </Layout>
  );
}

export { IncomesLayout };
