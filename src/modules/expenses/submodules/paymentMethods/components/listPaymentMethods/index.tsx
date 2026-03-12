import { useState } from 'react';
import { Badge } from '@shared/components/ui/badge';
import { Button } from '@shared/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@shared/components/ui/card';
import { Skeleton } from '@shared/components/ui/skeleton';
import { Pencil, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { PaymentMethodDto } from '../../services/getPaymentMethods/getPaymentMethods.dto';
import { useListingPaymentMethodsQuery } from '../../hooks/queries/useListingPaymentMethodsQuery';
import { useDeletePaymentMethodMutation } from '../../hooks/mutations/useDeletePaymentMethodMutation';
import { DialogUpdatePaymentMethod } from '../dialogUpdatePaymentMethod';

const TYPE_LABELS: Record<string, string> = {
  credit_card: 'Crédito',
  debit_card: 'Débito',
  pix: 'Pix',
  cash: 'Dinheiro',
};

function ListPaymentMethods() {
  const [editTarget, setEditTarget] = useState<PaymentMethodDto | null>(null);

  const { data: paymentMethods, isLoading } = useListingPaymentMethodsQuery();
  const { mutate: deletePaymentMethod } = useDeletePaymentMethodMutation();

  const handleDelete = (id: number) => {
    deletePaymentMethod(id, {
      onSuccess: () => toast.success('Método de pagamento excluído!'),
      onError: () => toast.error('Erro ao excluir método de pagamento.'),
    });
  };

  if (isLoading) {
    return (
      <div className='grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4'>
        {['a', 'b', 'c', 'd'].map((k) => (
          <Skeleton key={k} className='h-28 rounded-xl' />
        ))}
      </div>
    );
  }

  return (
    <>
      <div className='grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4'>
        {paymentMethods.map((pm) => (
          <Card key={pm.id} className='gap-3 py-4'>
            <CardHeader className='px-4'>
              <div className='flex items-start justify-between gap-2'>
                <div className='space-y-1'>
                  <CardTitle className='text-sm'>{pm.name}</CardTitle>
                  <Badge variant='secondary' className='text-xs'>
                    {TYPE_LABELS[pm.type] ?? pm.type}
                  </Badge>
                </div>
                {!pm.is_protected && (
                  <div className='flex shrink-0 gap-1'>
                    <Button
                      size='icon'
                      variant='ghost'
                      className='size-6'
                      onClick={() => setEditTarget(pm)}
                    >
                      <Pencil className='size-3.5' />
                    </Button>
                    <Button
                      size='icon'
                      variant='ghost'
                      className='text-destructive hover:text-destructive size-6'
                      onClick={() => handleDelete(pm.id)}
                    >
                      <Trash2 className='size-3.5' />
                    </Button>
                  </div>
                )}
              </div>
            </CardHeader>
            {(pm.brand || pm.last_four_digits) && (
              <CardContent className='px-4'>
                <p className='text-muted-foreground text-xs'>
                  {pm.brand}
                  {pm.brand && pm.last_four_digits && ' · '}
                  {pm.last_four_digits && `•••• ${pm.last_four_digits}`}
                </p>
              </CardContent>
            )}
          </Card>
        ))}
      </div>

      <DialogUpdatePaymentMethod
        paymentMethod={editTarget}
        onClose={() => setEditTarget(null)}
      />
    </>
  );
}

export { ListPaymentMethods };
