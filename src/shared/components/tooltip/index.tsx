import {
  Tooltip as TooltipContainer,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@shared/components/ui/tooltip';

type Props = {
  text: string;
  delayDuration?: number;
  side?: 'top' | 'right' | 'bottom' | 'left';
  align?: 'start' | 'center' | 'end';
  children: React.ReactNode;
};

const Tooltip = ({
  text,
  delayDuration = 700,
  side = 'top',
  align = 'center',
  children,
}: Props) => (
  <TooltipProvider delayDuration={delayDuration}>
    <TooltipContainer>
      <TooltipTrigger asChild>{children}</TooltipTrigger>
      <TooltipContent side={side} align={align}>
        <p>{text}</p>
      </TooltipContent>
    </TooltipContainer>
  </TooltipProvider>
);

export { Tooltip };
