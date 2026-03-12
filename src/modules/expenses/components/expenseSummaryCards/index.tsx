import { Card, CardContent } from '@shared/components/ui/card';
import { Skeleton } from '@shared/components/ui/skeleton';
import { useExpensesSummaryQuery } from '../../hooks/queries/useExpensesSummaryQuery';

type Props = {
  readonly month?: number;
  readonly year?: number;
  readonly invoice_month?: number;
  readonly invoice_year?: number;
};

const formatCurrency = (value: number) =>
  new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);

function ExpenseSummaryCards({ month, year, invoice_month, invoice_year }: Props) {
  const { data, isLoading } = useExpensesSummaryQuery({ month, year, invoice_month, invoice_year });

  const expenses = data?.data ?? [];

  const totalMonth = expenses.reduce(
    (acc, e) => acc + Number.parseFloat(e.amount),
    0,
  );
  const installmentExpenses = expenses.filter((e) => !!e.installment);
  const totalInstallments = installmentExpenses.reduce(
    (acc, e) => acc + Number.parseFloat(e.amount),
    0,
  );

  const categoryMap = new Map<string, number>();
  for (const expense of expenses) {
    const key = expense.subcategory ?? 'Sem categoria';
    categoryMap.set(key, (categoryMap.get(key) ?? 0) + Number.parseFloat(expense.amount));
  }
  const sortedCategories = Array.from(categoryMap.entries()).sort((a, b) => b[1] - a[1]);
  const topCategory = sortedCategories[0];
  const secondCategory = sortedCategories[1];

  if (isLoading) {
    return (
      <div className='grid grid-cols-4 gap-3 py-4'>
        {['maior', 'segundo', 'total', 'parcelado'].map((k) => (
          <Skeleton key={k} className='h-16 rounded-xl' />
        ))}
      </div>
    );
  }

  return (
    <div className='grid grid-cols-4 gap-3 py-4'>
      <Card className='py-0'>
        <CardContent className='flex items-center justify-between px-5 py-4'>
          <p className='text-muted-foreground text-sm'>Maior gasto</p>
          <div className='text-right'>
            {topCategory ? (
              <>
                <p className='text-lg font-bold'>{formatCurrency(topCategory[1])}</p>
                <p className='text-muted-foreground max-w-28 truncate text-xs'>{topCategory[0]}</p>
              </>
            ) : (
              <p className='text-muted-foreground text-sm'>—</p>
            )}
          </div>
        </CardContent>
      </Card>

      <Card className='py-0'>
        <CardContent className='flex items-center justify-between px-5 py-4'>
          <p className='text-muted-foreground text-sm'>2º maior gasto</p>
          <div className='text-right'>
            {secondCategory ? (
              <>
                <p className='text-lg font-bold'>{formatCurrency(secondCategory[1])}</p>
                <p className='text-muted-foreground max-w-28 truncate text-xs'>{secondCategory[0]}</p>
              </>
            ) : (
              <p className='text-muted-foreground text-sm'>—</p>
            )}
          </div>
        </CardContent>
      </Card>

      <Card className='py-0'>
        <CardContent className='flex items-center justify-between px-5 py-4'>
          <p className='text-muted-foreground text-sm'>Total do mês</p>
          <div className='text-right'>
            <p className='text-lg font-bold'>{formatCurrency(totalMonth)}</p>
            <p className='text-muted-foreground text-xs'>
              {expenses.length} {expenses.length === 1 ? 'despesa' : 'despesas'}
            </p>
          </div>
        </CardContent>
      </Card>

      <Card className='py-0'>
        <CardContent className='flex items-center justify-between px-5 py-4'>
          <p className='text-muted-foreground text-sm'>Total parcelado</p>
          <div className='text-right'>
            <p className='text-lg font-bold'>{formatCurrency(totalInstallments)}</p>
            <p className='text-muted-foreground text-xs'>
              {installmentExpenses.length}{' '}
              {installmentExpenses.length === 1 ? 'parcela' : 'parcelas'}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export { ExpenseSummaryCards };
