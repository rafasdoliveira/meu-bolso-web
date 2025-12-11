import { Layout } from '@shared/components/layout/index';
import { SidebarButtonType } from '@shared/types/sidebarButtonType';
import { dashboardModules } from '../../mocks/dashboardModules';

export type Children = {
  children: React.ReactNode;
};

const DashBoardLayout = ({ children }: Children) => {
  const { modules } = dashboardModules();

  const sidebarButton: SidebarButtonType[] = modules.map((item) => ({
    icon: item.icon,
    label: item.title,
    path: item.path,
    disabled: item.disabled,
  }));

  return <Layout sidebarButton={sidebarButton}>{children}</Layout>;
};

export { DashBoardLayout };
