/* eslint-disable @typescript-eslint/no-explicit-any */
import { JSX } from 'react';

type ActionButton = {
  label: string;
  icon: ((value: any) => JSX.Element) | JSX.Element;
  disabled?: ((value: any) => boolean) | boolean;
  onClick: (value?: any) => any;
};

export type { ActionButton };
