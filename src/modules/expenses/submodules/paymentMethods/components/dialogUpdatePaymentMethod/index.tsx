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
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { PaymentMethodDto } from '../../services/getPaymentMethods/getPaymentMethods.dto';
import { useUpdatePaymentMethodMutation } from '../../hooks/mutations/useUpdatePaymentMethodMutation';
import {
  paymentMethodSchema,
  PaymentMethodFormValues,
} from '../../schema/paymentMethodSchema';
import { PaymentMethodForm } from '../paymentMethodForm';

type Props = {
  paymentMethod: PaymentMethodDto | null;
  onClose: () => void;
};

function DialogUpdatePaymentMethod({ paymentMethod, onClose }: Readonly<Props>) {
  const { mutate: updatePaymentMethod, isPending } =
    useUpdatePaymentMethodMutation();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<PaymentMethodFormValues>({
    resolver: zodResolver(paymentMethodSchema),
  });

  useEffect(() => {
    if (paymentMethod) {
      reset({
        name: paymentMethod.name,
        type: paymentMethod.type,
        brand: paymentMethod.brand ?? '',
        last_four_digits: paymentMethod.last_four_digits ?? '',
        closing_day: paymentMethod.closing_day,
        due_day: paymentMethod.due_day,
      });
    }
  }, [paymentMethod, reset]);

  const onSubmit = (data: PaymentMethodFormValues) => {
    if (!paymentMethod) return;

    updatePaymentMethod(
      {
        id: paymentMethod.id,
        name: data.name,
        type: data.type,
        brand: data.brand || undefined,
        last_four_digits: data.last_four_digits || undefined,
      },
      {
        onSuccess: () => {
          toast.success('Método de pagamento atualizado!');
          onClose();
        },
        onError: () => toast.error('Erro ao atualizar método de pagamento.'),
      },
    );
  };

  return (
    <Dialog open={Boolean(paymentMethod)} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className='sm:max-w-md'>
        <DialogHeader>
          <DialogTitle>Editar Método de Pagamento</DialogTitle>
          <DialogDescription>
            Atualize as informações do método de pagamento.
          </DialogDescription>
        </DialogHeader>

        <PaymentMethodForm
          register={register}
          errors={errors}
          setValue={setValue}
          watch={watch}
        />

        <DialogFooter>
          <DialogClose asChild>
            <Button type='button' variant='ghost' onClick={onClose}>
              Cancelar
            </Button>
          </DialogClose>
          <Button
            type='button'
            onClick={handleSubmit(onSubmit)}
            disabled={isPending}
          >
            {isPending ? 'Salvando...' : 'Salvar'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export { DialogUpdatePaymentMethod };
