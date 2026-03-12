import { SidebarButtonType } from '@shared/types/sidebarButtonType';
import { Wallet } from 'lucide-react';
import * as React from 'react';
import { NavMain } from '../navMain';
import { NavUser } from '../navUser';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenuButton,
  SidebarRail,
} from '../ui/sidebar';

export function AppSidebar({
  navMain,
  ...props
}: { navMain: SidebarButtonType[] } & React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible='icon' {...props}>
      <SidebarHeader className='bg-white'>
        <SidebarMenuButton>
          <Wallet size={20} className='w-full' />
          <span className='font-bold uppercase'>Meu Bolso</span>
        </SidebarMenuButton>
      </SidebarHeader>
      <SidebarContent className='bg-white'>
        <NavMain items={navMain} />
      </SidebarContent>
      <SidebarFooter className='bg-white'>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
