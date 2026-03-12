import { Card, CardContent, CardHeader, CardTitle } from '@shared/components/ui/card';
import { Skeleton } from '@shared/components/ui/skeleton';
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { useDashboardChartData } from '../../hooks/useDashboardChartData';

const fmt = (value: number) =>
  new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);

function DashboardMonthlyChart() {
  const { chartData, isLoading } = useDashboardChartData();

  return (
    <Card className='flex-1'>
      <CardHeader>
        <CardTitle className='text-base'>Despesas — últimos 6 meses</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <Skeleton className='h-52 w-full rounded-lg' />
        ) : (
          <ResponsiveContainer width='100%' height={220}>
            <BarChart data={chartData} barSize={28}>
              <CartesianGrid strokeDasharray='3 3' vertical={false} />
              <XAxis dataKey='name' tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis
                tickFormatter={(v) => `R$${v}`}
                tick={{ fontSize: 11 }}
                axisLine={false}
                tickLine={false}
                width={60}
              />
              <Tooltip
                formatter={(value: number) => [fmt(value), 'Despesas']}
                cursor={{ fill: 'hsl(var(--muted))' }}
              />
              <Bar dataKey='despesas' fill='hsl(var(--primary))' radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
}

export { DashboardMonthlyChart };
