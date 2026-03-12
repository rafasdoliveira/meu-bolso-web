import { Card, CardContent } from '@shared/components/ui/card';
import { Skeleton } from '@shared/components/ui/skeleton';
import { ArrowDownCircle, ArrowUpCircle, Wallet } from 'lucide-react';
import { useExpensesSummaryQuery } from '@modules/expenses/hooks/queries/useExpensesSummaryQuery';
import { getIncomesService } from '@modules/incomes/services/getIncomes/getIncomes.service';
import { useQuery } from '@tanstack/react-query';

const fmt = (value: number) =>
  new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);

function DashboardSummaryCards() {
  const now = new Date();
  const month = now.getMonth() + 1;
  const year = now.getFullYear();

  const { data: expensesData, isLoading: loadingExpenses } = useExpensesSummaryQuery({ month, year });
  const { data: incomesData, isLoading: loadingIncomes } = useQuery({
    queryKey: ['dashboard-incomes-summary'],
    queryFn: () => getIncomesService.execute({ page: 1, size: 9999 }),
  });

  const totalExpenses = (expensesData?.data ?? []).reduce(
    (acc, e) => acc + Number.parseFloat(e.amount),
    0,
  );

  const totalIncomes = (incomesData?.data ?? [])
    .filter((i) => {
      const d = new Date(i.date);
      return d.getMonth() + 1 === month && d.getFullYear() === year;
    })
    .reduce((acc, i) => acc + Number.parseFloat(i.amount), 0);

  const balance = totalIncomes - totalExpenses;

  const isLoading = loadingExpenses || loadingIncomes;

  if (isLoading) {
    return (
      <div className='grid grid-cols-3 gap-4'>
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={i} className='h-24 rounded-xl' />
        ))}
      </div>
    );
  }

  return (
    <div className='grid grid-cols-3 gap-4'>
      <Card>
        <CardContent className='flex items-center gap-4 px-5 py-4'>
          <div className='flex size-10 items-center justify-center rounded-full bg-green-100'>
            <ArrowUpCircle className='size-5 text-green-600' />
          </div>
          <div>
            <p className='text-muted-foreground text-sm'>Total Receitas</p>
            <p className='text-xl font-bold'>{fmt(totalIncomes)}</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className='flex items-center gap-4 px-5 py-4'>
          <div className='flex size-10 items-center justify-center rounded-full bg-red-100'>
            <ArrowDownCircle className='size-5 text-red-600' />
          </div>
          <div>
            <p className='text-muted-foreground text-sm'>Total Despesas</p>
            <p className='text-xl font-bold'>{fmt(totalExpenses)}</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className='flex items-center gap-4 px-5 py-4'>
          <div
            className={`flex size-10 items-center justify-center rounded-full ${balance >= 0 ? 'bg-blue-100' : 'bg-orange-100'}`}
          >
            <Wallet className={`size-5 ${balance >= 0 ? 'text-blue-600' : 'text-orange-600'}`} />
          </div>
          <div>
            <p className='text-muted-foreground text-sm'>Saldo do Mês</p>
            <p className={`text-xl font-bold ${balance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {fmt(balance)}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export { DashboardSummaryCards };
