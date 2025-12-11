import { ActionButton } from '@shared/types/actionButtonType';
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenu as DropdownMenuWrapper,
} from '../ui/dropdown-menu';

type Props = {
  children: React.ReactNode;
  buttons: ActionButton[];
};

const DropdownMenu = ({ children, buttons }: Props) => {
  return (
    <DropdownMenuWrapper>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent align='center' side='right'>
        {buttons.map(({ label, icon, onClick, disabled }, i) => (
          <div key={label}>
            <DropdownMenuItem
              className='cursor-pointer gap-2'
              onClick={onClick}
              disabled={!!disabled}
            >
              {typeof icon === 'function' ? icon(icon) : icon}
              {label}
            </DropdownMenuItem>
            {i < buttons.length - 1 && <DropdownMenuSeparator />}
          </div>
        ))}
      </DropdownMenuContent>
    </DropdownMenuWrapper>
  );
};

export { DropdownMenu };
