import { Layout } from '@shared/components/layout/index';
import { BreadcrumbType } from '@shared/types/breadcrumbType';
import { ScrollArea } from '@shared/components/ui/scroll-area';
import { SideBarButtonsExpenses } from '../../mocks/sidebarButtonsExpenses';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

type Props = {
  children: React.ReactNode;
};

function ExpensesLayout({ children }: Readonly<Props>) {
  const location = useLocation();

  const [breadcrumbs, setBreadcrumbs] = useState<BreadcrumbType[]>([
    { label: 'Despesas', path: '/despesas' },
  ]);

  const handleBreadcrumbs = () => {
    const currentPath = location.pathname;

    if (currentPath === '/despesas') return;

    for (const { label, path } of SideBarButtonsExpenses) {
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
    <Layout breadcrumbs={breadcrumbs} sidebarButton={SideBarButtonsExpenses}>
      <ScrollArea>{children}</ScrollArea>
    </Layout>
  );
}

export { ExpensesLayout };
