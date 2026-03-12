import { Badge } from '@shared/components/ui/badge';
import { Button } from '@shared/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@shared/components/ui/card';
import { Invoice, InvoiceStatus } from '@shared/types/invoice';
import { CreditCard, Wallet } from 'lucide-react';

type Props = {
  readonly invoice: Invoice;
  readonly onPay: (invoice: Invoice) => void;
};

const formatCurrency = (value: string | number) =>
  new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(Number(value));

const STATUS_CONFIG: Record<InvoiceStatus, { label: string; className: string }> = {
  pending: { label: 'Pendente', className: 'bg-yellow-500 hover:bg-yellow-500' },
  partial: { label: 'Parcial', className: 'bg-blue-500 hover:bg-blue-500' },
  paid: { label: 'Paga', className: 'bg-green-500 hover:bg-green-500' },
};

function InvoiceCard({ invoice, onPay }: Props) {
  const total = Number(invoice.total_amount);
  const paid = Number(invoice.paid_amount);
  const progressPercent = total > 0 ? Math.round((paid / total) * 100) : 0;
  const statusConfig = STATUS_CONFIG[invoice.status];
  const isPaid = invoice.status === 'paid';

  return (
    <Card className='flex flex-col gap-0 py-0'>
      <CardHeader className='flex flex-row items-start justify-between gap-2 px-5 pt-5 pb-3'>
        <div className='space-y-1'>
          <div className='flex items-center gap-2'>
            <CreditCard className='text-muted-foreground size-4' />
            <p className='font-semibold'>{invoice.payment_method.name}</p>
          </div>
          {invoice.payment_method.last_four_digits && (
            <p className='text-muted-foreground text-xs'>
              {invoice.payment_method.brand && `${invoice.payment_method.brand} · `}
              •••• {invoice.payment_method.last_four_digits}
            </p>
          )}
        </div>
        <Badge className={statusConfig.className}>{statusConfig.label}</Badge>
      </CardHeader>

      <CardContent className='space-y-3 px-5 pb-4'>
        <div className='grid grid-cols-2 gap-x-4 gap-y-1 text-sm'>
          <span className='text-muted-foreground'>Fatura ref.</span>
          <span className='text-right font-medium'>{invoice.reference_date}</span>
          <span className='text-muted-foreground'>Vencimento</span>
          <span className='text-right font-medium'>{invoice.due_date}</span>
        </div>

        <div className='space-y-1.5'>
          <div className='flex justify-between text-sm'>
            <span className='text-muted-foreground'>Pago</span>
            <span className='font-medium'>{formatCurrency(invoice.paid_amount)}</span>
          </div>
          <div className='bg-muted h-2 w-full overflow-hidden rounded-full'>
            <div
              className='h-full rounded-full bg-green-500 transition-all'
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <div className='flex justify-between text-xs'>
            <span className='text-muted-foreground'>{progressPercent}% pago</span>
            <span className='text-muted-foreground'>Total: {formatCurrency(invoice.total_amount)}</span>
          </div>
        </div>

        {!isPaid && (
          <div className='flex items-center justify-between rounded-md border border-yellow-200 bg-yellow-50 px-3 py-2 text-sm dark:border-yellow-700 dark:bg-yellow-950'>
            <span className='text-yellow-800 dark:text-yellow-300'>Restante</span>
            <span className='font-semibold text-yellow-800 dark:text-yellow-300'>
              {formatCurrency(invoice.remaining_amount)}
            </span>
          </div>
        )}
      </CardContent>

      {!isPaid && (
        <CardFooter className='px-5 pb-5'>
          <Button className='w-full' size='sm' onClick={() => onPay(invoice)}>
            <Wallet className='size-4' />
            Pagar Fatura
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}

export { InvoiceCard };
