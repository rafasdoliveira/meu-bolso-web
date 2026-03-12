import { Badge } from '@shared/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@shared/components/ui/card';
import { Skeleton } from '@shared/components/ui/skeleton';
import { cn } from '@shared/components/lib/utils';
import { useExpensesSummaryQuery } from '@modules/expenses/hooks/queries/useExpensesSummaryQuery';

const fmt = (value: string) =>
  new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(
    Number.parseFloat(value),
  );

function DashboardRecentTransactions() {
  const now = new Date();
  const { data, isLoading } = useExpensesSummaryQuery({
    month: now.getMonth() + 1,
    year: now.getFullYear(),
  });

  const recent = (data?.data ?? []).slice(0, 6);

  return (
    <Card className='flex-1'>
      <CardHeader>
        <CardTitle className='text-base'>Transações Recentes</CardTitle>
      </CardHeader>
      <CardContent className='space-y-3'>
        {isLoading
          ? Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className='h-10 w-full rounded-lg' />
            ))
          : recent.map((expense) => (
              <div
                key={expense.id}
                className='flex items-center justify-between rounded-lg px-1 py-1'
              >
                <div className='min-w-0'>
                  <p className='truncate text-sm font-medium'>{expense.description}</p>
                  <p className='text-muted-foreground text-xs'>
                    {expense.date}
                    {expense.installment && ` · ${expense.installment}`}
                  </p>
                </div>
                <div className='ml-4 flex shrink-0 items-center gap-2'>
                  <Badge
                    className={cn(
                      'text-xs',
                      expense.status === 'paid'
                        ? 'bg-green-500 hover:bg-green-500'
                        : 'bg-yellow-500 hover:bg-yellow-500',
                    )}
                  >
                    {expense.status === 'paid' ? 'Pago' : 'Pendente'}
                  </Badge>
                  <p className='text-sm font-semibold text-red-600'>
                    -{fmt(expense.amount)}
                  </p>
                </div>
              </div>
            ))}
        {!isLoading && recent.length === 0 && (
          <p className='text-muted-foreground py-4 text-center text-sm'>
            Nenhuma transação este mês.
          </p>
        )}
      </CardContent>
    </Card>
  );
}

export { DashboardRecentTransactions };
