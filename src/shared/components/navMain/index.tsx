import { Separator } from '@radix-ui/react-separator';
import { SidebarButtonType } from '@shared/types/sidebarButtonType';
import { ChevronRight, LayoutDashboard } from 'lucide-react';
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '../ui/collapsible';
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from '../ui/sidebar';

type Props = {
  items: SidebarButtonType[];
};

export function NavMain({ items }: Readonly<Props>) {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) =>
    location.pathname === path || location.pathname.startsWith(path);

  return (
    <SidebarGroup>
      <SidebarMenu>
        <SidebarMenuButton
          tooltip='Dashboard'
          onClick={() => navigate('/dashboard')}
          className={isActive('/dashboard') ? 'bg-primary text-white' : ''}
        >
          <LayoutDashboard />
          <span>Dashboard</span>
          <ChevronRight className='ml-auto transition-transform duration-200 group-data-[state=open]collapsible:rotate-90' />
        </SidebarMenuButton>
        <Separator className='my-2 border' />
        <SidebarGroupLabel>Módulos</SidebarGroupLabel>
        {items.map((item) => (
          <Collapsible
            key={item.label}
            asChild
            defaultOpen={item.disabled}
            className='group/collapsible'
          >
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton
                  tooltip={item.label}
                  onClick={() => navigate(item.path)}
                  className={
                    isActive(item.path)
                      ? 'bg-primary cursor-pointer text-white'
                      : 'cursor-pointer'
                  }
                >
                  {item.icon && React.isValidElement(item.icon)
                    ? item.icon
                    : null}
                  <span>{item.label}</span>
                  <ChevronRight className='ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90' />
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>
                  {item.items?.map((subItem) => (
                    <SidebarMenuSubItem key={subItem.title}>
                      <SidebarMenuSubButton asChild>
                        <a href={subItem.path}>
                          {subItem.icon}
                          <span>{subItem.title}</span>
                        </a>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  ))}
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
