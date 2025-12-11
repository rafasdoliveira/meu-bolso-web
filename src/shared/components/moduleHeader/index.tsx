import { JSX } from 'react';

type headerProps = {
  icon?: JSX.Element;
  title: string;
  subtitle?: string;
};

const ModuleHeader = ({ title, icon, subtitle }: headerProps) => {
  return (
    <div className='mb-6'>
      <div className='flex flex-row items-center'>
        {icon && <div className='animate-bounceIn mr-2'>{icon}</div>}
        <h1 className='text-xl font-semibold'>{title}</h1>
      </div>
      <h2 className='text-zinc-400'>{subtitle}</h2>
    </div>
  );
};

export { ModuleHeader };
