import { Card, CardContent, CardHeader, CardTitle } from '@shared/components/ui/card';
import { Skeleton } from '@shared/components/ui/skeleton';
import {
  Bar,
  BarChart,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { useExpensesSummaryQuery } from '../../hooks/queries/useExpensesSummaryQuery';

type Props = {
  readonly month?: number;
  readonly year?: number;
};

const COLORS = [
  '#6366f1', '#8b5cf6', '#ec4899', '#f59e0b',
  '#10b981', '#3b82f6', '#f97316', '#14b8a6',
];

const formatCurrency = (value: number) =>
  new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);

function ExpenseCategoryChart({ month, year }: Props) {
  const { data, isLoading } = useExpensesSummaryQuery({ month, year });

  const expenses = data?.data ?? [];

  const categoryMap = new Map<string, number>();
  for (const expense of expenses) {
    const key = expense.subcategory ?? 'Sem categoria';
    categoryMap.set(key, (categoryMap.get(key) ?? 0) + Number.parseFloat(expense.amount));
  }

  const chartData = Array.from(categoryMap.entries())
    .map(([name, amount]) => ({ name, amount }))
    .sort((a, b) => b.amount - a.amount);

  if (isLoading) {
    return <Skeleton className='h-52 w-full rounded-xl' />;
  }

  if (chartData.length === 0) {
    return (
      <Card>
        <CardHeader className='pb-2'>
          <CardTitle className='text-sm font-semibold'>Gastos por Categoria</CardTitle>
        </CardHeader>
        <CardContent>
          <p className='text-muted-foreground py-8 text-center text-sm'>
            Nenhuma despesa encontrada para o período selecionado.
          </p>
        </CardContent>
      </Card>
    );
  }

  const chartHeight = Math.max(chartData.length * 44, 120);

  return (
    <Card>
      <CardHeader className='pb-2'>
        <CardTitle className='text-sm font-semibold'>Gastos por Categoria</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width='100%' height={chartHeight}>
          <BarChart
            data={chartData}
            layout='vertical'
            margin={{ left: 8, right: 24, top: 4, bottom: 4 }}
          >
            <XAxis
              type='number'
              tickFormatter={(v) => `R$ ${v.toLocaleString('pt-BR')}`}
              tick={{ fontSize: 11 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              type='category'
              dataKey='name'
              width={130}
              tick={{ fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              formatter={(value: number) => [formatCurrency(value), 'Total']}
              cursor={{ fill: 'hsl(var(--muted))', opacity: 0.5 }}
            />
            <Bar dataKey='amount' radius={4} maxBarSize={28}>
              {chartData.map((_, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

export { ExpenseCategoryChart };
