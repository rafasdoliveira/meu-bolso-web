import { JSX } from 'react';

type DashboardModule = {
  icon: JSX.Element;
  title: string;
  description: string;
  moduleAction: moduleAction[];
  path: string;
  permission: string;
  disabled?: boolean;
};

type moduleAction = {
  label: string;
  color: string;
};

export type { DashboardModule, moduleAction };
