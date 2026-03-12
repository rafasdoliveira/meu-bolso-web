import { ModuleHeader } from '@components/moduleHeader';
import { Skeleton } from '@shared/components/ui/skeleton';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@components/ui/select';
import { Invoice } from '@shared/types/invoice';
import { Receipt } from 'lucide-react';
import { useState } from 'react';
import { DialogCreateExpense } from '../../../components/dialogCreateExpense';
import { ExpensesLayout } from '../../../components/layout';
import { useListingPaymentMethodsQuery } from '../../paymentMethods/hooks/queries/useListingPaymentMethodsQuery';
import { DialogPayInvoice } from '../components/dialogPayInvoice';
import { InvoiceCard } from '../components/invoiceCard';
import { useListingInvoicesQuery } from '../hooks/queries/useListingInvoicesQuery';

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

function Invoices() {
  const now = new Date();
  const [month, setMonth] = useState(String(now.getMonth() + 1));
  const [year, setYear] = useState(String(now.getFullYear()));
  const [paymentMethodId, setPaymentMethodId] = useState('');
  const [invoiceToPay, setInvoiceToPay] = useState<Invoice | null>(null);

  const { data: paymentMethods } = useListingPaymentMethodsQuery();
  const { data: invoices = [], isLoading } = useListingInvoicesQuery({
    user_id: 1,
    month: Number(month),
    year: Number(year),
    payment_method_id:
      paymentMethodId && paymentMethodId !== 'all'
        ? Number(paymentMethodId)
        : undefined,
  });

  const currentYear = now.getFullYear();
  const years = Array.from({ length: 5 }, (_, i) => String(currentYear - i));

  return (
    <ExpensesLayout>
      <div className='flex items-center justify-between'>
        <ModuleHeader
          title='Faturas'
          subtitle='Acompanhe e pague as faturas dos seus cartões de crédito.'
        />
      </div>

      <div className='flex flex-wrap items-center justify-between gap-2 py-4'>
        <div className='flex flex-wrap items-center gap-2'>
          <Select value={paymentMethodId} onValueChange={setPaymentMethodId}>
            <SelectTrigger className='w-44 bg-white'>
              <SelectValue placeholder='Todos os cartões' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='all'>Todos os cartões</SelectItem>
              {paymentMethods
                .filter((pm) => pm.type === 'credit_card')
                .map((pm) => (
                  <SelectItem key={pm.id} value={String(pm.id)}>
                    {pm.name}
                    {pm.last_four_digits && ` •••• ${pm.last_four_digits}`}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
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
        </div>

        <div className='flex items-center gap-2'>
          <DialogCreateExpense />
        </div>
      </div>

      {isLoading ? (
        <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3'>
          {['a', 'b', 'c'].map((k) => (
            <Skeleton key={k} className='h-56 rounded-xl' />
          ))}
        </div>
      ) : invoices.length === 0 ? (
        <div className='flex flex-col items-center justify-center gap-3 py-20 text-center'>
          <Receipt className='text-muted-foreground size-12' />
          <p className='text-muted-foreground text-sm'>
            Nenhuma fatura encontrada para o período selecionado.
          </p>
        </div>
      ) : (
        <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3'>
          {invoices.map((invoice) => (
            <InvoiceCard
              key={invoice.id}
              invoice={invoice}
              onPay={setInvoiceToPay}
            />
          ))}
        </div>
      )}

      <DialogPayInvoice
        invoice={invoiceToPay}
        onClose={() => setInvoiceToPay(null)}
      />
    </ExpensesLayout>
  );
}

export { Invoices };
