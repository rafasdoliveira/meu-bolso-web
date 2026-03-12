import { useState } from 'react';
import { Search } from 'lucide-react';
import { useDebounce } from '@shared/hooks/useDebounce';
import { ModuleHeader } from '@components/moduleHeader';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@components/ui/select';
import { Input } from '@components/ui/input';
import { Button } from '@components/ui/button';
import { DialogCreateExpense } from '../components/dialogCreateExpense';
import { ExpensesLayout } from '../components/layout';
import { ListExpensesDataTable } from '../components/listExpensesDataTable';
import { ExpenseSummaryCards } from '../components/expenseSummaryCards';
import { useListingPaymentMethodsQuery } from '../submodules/paymentMethods/hooks/queries/useListingPaymentMethodsQuery';

const MONTHS = [
  { value: '1', label: 'Janeiro' },
  { value: '2', label: 'Fevereiro' },
  { value: '3', label: 'Março' },
  { value: '4', label: 'Abril' },
  { value: '5', label: 'Maio' },
  { value: '6', label: 'Junho' },
  { value: '7', label: 'Julho' },
  { value: '8', label: 'Agosto' },
  { value: '9', label: 'Setembro' },
  { value: '10', label: 'Outubro' },
  { value: '11', label: 'Novembro' },
  { value: '12', label: 'Dezembro' },
];

function Expenses() {
  const now = new Date();
  const [viewMode, setViewMode] = useState<'date' | 'invoice'>('date');
  const [month, setMonth] = useState(String(now.getMonth() + 1));
  const [year, setYear] = useState(String(now.getFullYear()));
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search);
  const [paymentMethodId, setPaymentMethodId] = useState('');

  const { data: paymentMethods } = useListingPaymentMethodsQuery();

  const currentYear = now.getFullYear();
  const years = Array.from({ length: 5 }, (_, i) => String(currentYear - i));

  const isInvoiceMode = viewMode === 'invoice';

  const summaryParams = isInvoiceMode
    ? { invoice_month: Number(month), invoice_year: Number(year) }
    : { month: Number(month), year: Number(year) };

  const tableParams = isInvoiceMode
    ? { invoice_month: Number(month), invoice_year: Number(year) }
    : { month: Number(month), year: Number(year) };

  return (
    <ExpensesLayout>
      <div className='flex items-center justify-between'>
        <ModuleHeader
          title='Despesas'
          subtitle='Acompanhe e organize todas as suas despesas de forma prática.'
        />
      </div>
      <ExpenseSummaryCards {...summaryParams} />
      <div className='flex flex-wrap items-center justify-end gap-2 py-4'>
        <div className='relative w-52'>
          <Search className='text-muted-foreground pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2' />
          <Input
            placeholder='Buscar por descrição...'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className='bg-white pl-8'
          />
        </div>
        <Select value={paymentMethodId} onValueChange={setPaymentMethodId}>
          <SelectTrigger className='w-44 bg-white'>
            <SelectValue placeholder='Tipo de Pagamento' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='all'>Todos</SelectItem>
            {paymentMethods.map((pm) => (
              <SelectItem key={pm.id} value={String(pm.id)}>
                {pm.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <div className='flex rounded-md border bg-white'>
          <Button
            variant={isInvoiceMode ? 'ghost' : 'default'}
            size='sm'
            className='rounded-r-none'
            onClick={() => setViewMode('date')}
          >
            Por data
          </Button>
          <Button
            variant={isInvoiceMode ? 'default' : 'ghost'}
            size='sm'
            className='rounded-l-none'
            onClick={() => setViewMode('invoice')}
          >
            Por fatura
          </Button>
        </div>
        <Select value={month} onValueChange={setMonth}>
          <SelectTrigger className='w-37.5 bg-white'>
            <SelectValue placeholder='Mês' />
          </SelectTrigger>
          <SelectContent>
            {MONTHS.map((m) => (
              <SelectItem key={m.value} value={m.value}>
                {m.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={year} onValueChange={setYear}>
          <SelectTrigger className='w-27.5 bg-white'>
            <SelectValue placeholder='Ano' />
          </SelectTrigger>
          <SelectContent>
            {years.map((y) => (
              <SelectItem key={y} value={y}>
                {y}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <DialogCreateExpense />
      </div>
      <ListExpensesDataTable
        {...tableParams}
        search={debouncedSearch}
        paymentMethodId={
          paymentMethodId && paymentMethodId !== 'all'
            ? Number(paymentMethodId)
            : undefined
        }
      />
    </ExpensesLayout>
  );
}

export { Expenses };
