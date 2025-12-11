import { BreadcrumbType } from '@shared/types/breadcrumbType';
import { SidebarButtonType } from '@shared/types/sidebarButtonType';
import { AppSidebar } from '../appSidebar';
import BreadcrumbLayout from '../breadcrumb';
import { ScrollArea } from '../ui/scroll-area';
import { Separator } from '../ui/separator';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '../ui/sidebar';

type Props = {
  children: React.ReactNode;
  sidebarButton: SidebarButtonType[];
  breadcrumbs?: BreadcrumbType[];
};

const Layout = ({ children, sidebarButton, breadcrumbs = [] }: Props) => {
  return (
    <SidebarProvider>
      <AppSidebar navMain={sidebarButton} />
      <SidebarInset>
        <header className='flex h-10 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12'>
          <div className='flex items-center gap-2 px-4'>
            {/* Sidebar */}
            <SidebarTrigger className='-ml-1' />
            <Separator orientation='vertical' className='mr-2 h-4' />
            {/* Breadcrumb */}
            <BreadcrumbLayout
              items={breadcrumbs.map(({ label, path }) => ({
                label,
                path,
              }))}
            />
          </div>
        </header>
        <div className='flex max-h-[95%] min-h-[94%] max-w-full'>
          <ScrollArea className='w-full p-4'>{children}</ScrollArea>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export { Layout };
