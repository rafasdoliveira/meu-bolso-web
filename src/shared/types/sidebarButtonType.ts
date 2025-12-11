import { JSX } from 'react';

type SidebarSubItem = {
  icon: JSX.Element;
  title: string;
  path: string;
};

type SidebarButtonType = {
  icon: JSX.Element;
  label: string;
  path: string;
  disabled?: boolean;
  items?: SidebarSubItem[];
};

export type { SidebarButtonType };
