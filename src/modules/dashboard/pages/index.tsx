import { DashBoardLayout } from '../components/layout';
import { DashboardSummaryCards } from '../components/dashboardSummaryCards';
import { DashboardMonthlyChart } from '../components/dashboardMonthlyChart';
import { DashboardRecentTransactions } from '../components/dashboardRecentTransactions';
import { DashboardPaymentCards } from '../components/dashboardPaymentCards';

function DashBoardPage() {
  const now = new Date();
  const monthLabel = now.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' });

  return (
    <DashBoardLayout>
      <div className='space-y-6'>
        <div>
          <h1 className='text-2xl font-bold capitalize'>Visão Geral</h1>
          <p className='text-muted-foreground text-sm capitalize'>{monthLabel}</p>
        </div>

        <DashboardSummaryCards />

        <div className='flex gap-4'>
          <DashboardMonthlyChart />
          <DashboardPaymentCards />
        </div>

        <DashboardRecentTransactions />
      </div>
    </DashBoardLayout>
  );
}

export { DashBoardPage };
