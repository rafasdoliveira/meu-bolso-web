import { Badge } from '@shared/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@shared/components/ui/card';
import { Skeleton } from '@shared/components/ui/skeleton';
import { CreditCard } from 'lucide-react';
import { useListingPaymentMethodsQuery } from '@modules/expenses/submodules/paymentMethods/hooks/queries/useListingPaymentMethodsQuery';

const TYPE_LABELS: Record<string, string> = {
  credit_card: 'Crédito',
  debit_card: 'Débito',
  pix: 'Pix',
  cash: 'Dinheiro',
};

function DashboardPaymentCards() {
  const { data: paymentMethods, isLoading } = useListingPaymentMethodsQuery();

  return (
    <Card className='w-72 shrink-0'>
      <CardHeader>
        <CardTitle className='text-base'>Meus Cartões</CardTitle>
      </CardHeader>
      <CardContent className='space-y-3'>
        {isLoading
          ? Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className='h-14 w-full rounded-lg' />
            ))
          : paymentMethods.map((pm) => (
              <div
                key={pm.id}
                className='bg-muted flex items-center gap-3 rounded-lg px-3 py-2.5'
              >
                <div className='bg-primary/10 flex size-8 items-center justify-center rounded-full'>
                  <CreditCard className='text-primary size-4' />
                </div>
                <div className='min-w-0 flex-1'>
                  <p className='truncate text-sm font-medium'>{pm.name}</p>
                  <p className='text-muted-foreground text-xs'>
                    {pm.last_four_digits ? `•••• ${pm.last_four_digits}` : TYPE_LABELS[pm.type]}
                  </p>
                </div>
                <Badge variant='secondary' className='text-xs'>
                  {TYPE_LABELS[pm.type] ?? pm.type}
                </Badge>
              </div>
            ))}
        {!isLoading && paymentMethods.length === 0 && (
          <p className='text-muted-foreground py-4 text-center text-sm'>
            Nenhum cartão cadastrado.
          </p>
        )}
      </CardContent>
    </Card>
  );
}

export { DashboardPaymentCards };
