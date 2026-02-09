import { ModuleHeader } from '@components/moduleHeader';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@components/ui/select';
import { Input } from '@shared/components/ui/input';
import { ListFilter, SearchIcon } from 'lucide-react';
import { DialogCreateIncome } from '../components/dialogCreateIncome';
import { IncomesLayout } from '../components/layout';
import { ListIncomesDataTable } from '../components/listIncomesDataTable';

function ReceitasPage() {
  return (
    <IncomesLayout>
      <div className='flex items-center justify-between'>
        <ModuleHeader
          title='Receitas'
          subtitle='Acompanhe e organize todas as suas receitas de forma prática.'
        />
      </div>
      <div className='flex items-center justify-end gap-2 py-4'>
        <div className='flex h-9 w-80 items-center rounded-lg border bg-white px-2 py-1'>
          <SearchIcon size='18px' />
          <Input
            className='border-none placeholder:text-gray-400'
            placeholder='Pesquise'
          />
        </div>
        <Select>
          <SelectTrigger className='w-[180px] bg-white'>
            <SelectValue placeholder='Período' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='current_month'>Mês atual</SelectItem>
            <SelectItem value='last_7'>Últimos 7 dias</SelectItem>
            <SelectItem value='last_30'>Últimos 30 dias</SelectItem>
            <SelectItem value='year'>Ano atual</SelectItem>
            <SelectItem value='custom'>Personalizado</SelectItem>
          </SelectContent>
        </Select>
        <Select>
          <SelectTrigger className='w-[180px] bg-white'>
            <div className='flex items-center gap-2'>
              <ListFilter className='h-4 w-4' />
              <SelectValue placeholder='Categoria' />
            </div>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='salary'>Salário</SelectItem>
            <SelectItem value='freelance'>Freelance</SelectItem>
            <SelectItem value='investments'>Investimentos</SelectItem>
          </SelectContent>
        </Select>
        <DialogCreateIncome />
      </div>
      <ListIncomesDataTable />
    </IncomesLayout>
  );
}

export { ReceitasPage };
