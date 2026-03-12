import { useQueries } from '@tanstack/react-query';
import { getExpensesService } from '@modules/expenses/services/getExpenses/getExpenses.service';

const MONTH_LABELS = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];

function useDashboardChartData() {
  const now = new Date();

  const months = Array.from({ length: 6 }, (_, i) => {
    const d = new Date(now.getFullYear(), now.getMonth() - 5 + i, 1);
    return { month: d.getMonth() + 1, year: d.getFullYear() };
  });

  const results = useQueries({
    queries: months.map(({ month, year }) => ({
      queryKey: ['dashboard-chart', month, year],
      queryFn: () => getExpensesService.execute({ page: 1, size: 9999, month, year }),
    })),
  });

  const chartData = months.map(({ month, year }, i) => {
    const expenses = results[i].data?.data ?? [];
    const total = expenses.reduce((acc, e) => acc + Number.parseFloat(e.amount), 0);
    return {
      name: `${MONTH_LABELS[month - 1]}/${String(year).slice(2)}`,
      despesas: Number(total.toFixed(2)),
    };
  });

  const isLoading = results.some((r) => r.isLoading);

  return { chartData, isLoading };
}

export { useDashboardChartData };
