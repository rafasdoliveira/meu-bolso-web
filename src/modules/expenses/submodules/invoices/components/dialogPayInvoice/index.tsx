import { Button } from '@shared/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@shared/components/ui/dialog';
import { Input } from '@shared/components/ui/input';
import { Label } from '@shared/components/ui/label';
import { Invoice } from '@shared/types/invoice';
import { useState } from 'react';
import { toast } from 'sonner';
import { usePayInvoiceMutation } from '../../hooks/mutations/usePayInvoiceMutation';

type Props = {
  readonly invoice: Invoice | null;
  readonly onClose: () => void;
};

const formatCurrency = (value: string | number) =>
  new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(Number(value));

function DialogPayInvoice({ invoice, onClose }: Props) {
  const [paidAmount, setPaidAmount] = useState('');
  const { mutate: payInvoice, isPending } = usePayInvoiceMutation();

  const remaining = Number(invoice?.remaining_amount ?? 0);

  const handlePayFull = () => {
    setPaidAmount(String(remaining));
  };

  const handleSubmit = () => {
    if (!invoice) return;
    const amount = Number(paidAmount);
    if (!amount || amount <= 0) {
      toast.error('Informe um valor válido.');
      return;
    }

    payInvoice(
      { id: invoice.id, paid_amount: amount },
      {
        onSuccess: () => {
          toast.success('Pagamento registrado com sucesso!');
          setPaidAmount('');
          onClose();
        },
        onError: () => toast.error('Erro ao registrar pagamento. Tente novamente.'),
      },
    );
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      setPaidAmount('');
      onClose();
    }
  };

  return (
    <Dialog open={Boolean(invoice)} onOpenChange={handleOpenChange}>
      <DialogContent className='sm:max-w-sm'>
        <DialogHeader>
          <DialogTitle>Pagar Fatura</DialogTitle>
          <DialogDescription>
            {invoice && (
              <>
                {invoice.payment_method.name}
                {invoice.payment_method.last_four_digits && ` •••• ${invoice.payment_method.last_four_digits}`}
                {' · '}{invoice.reference_date}
              </>
            )}
          </DialogDescription>
        </DialogHeader>

        {invoice && (
          <div className='space-y-4'>
            <div className='grid grid-cols-2 gap-2 rounded-lg border p-3 text-sm'>
              <span className='text-muted-foreground'>Total da fatura</span>
              <span className='text-right font-medium'>{formatCurrency(invoice.total_amount)}</span>
              <span className='text-muted-foreground'>Já pago</span>
              <span className='text-right font-medium text-green-600'>{formatCurrency(invoice.paid_amount)}</span>
              <span className='text-muted-foreground font-semibold'>Restante</span>
              <span className='text-right font-semibold'>{formatCurrency(invoice.remaining_amount)}</span>
            </div>

            <div className='space-y-1.5'>
              <div className='flex items-center justify-between'>
                <Label htmlFor='paid-amount'>Valor a pagar</Label>
                <button
                  type='button'
                  className='text-primary text-xs underline'
                  onClick={handlePayFull}
                >
                  Pagar valor total
                </button>
              </div>
              <Input
                id='paid-amount'
                type='number'
                placeholder='0,00'
                min={0.01}
                step={0.01}
                value={paidAmount}
                onChange={(e) => setPaidAmount(e.target.value)}
              />
            </div>
          </div>
        )}

        <DialogFooter>
          <DialogClose asChild>
            <Button type='button' variant='destructive'>
              Cancelar
            </Button>
          </DialogClose>
          <Button type='button' onClick={handleSubmit} disabled={isPending || !paidAmount}>
            {isPending ? 'Registrando...' : 'Confirmar'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export { DialogPayInvoice };
