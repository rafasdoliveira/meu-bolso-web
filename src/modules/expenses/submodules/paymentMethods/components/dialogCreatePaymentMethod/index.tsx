import { Button } from '@shared/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@shared/components/ui/dialog';
import { zodResolver } from '@hookform/resolvers/zod';
import { CirclePlus } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { useCreatePaymentMethodMutation } from '../../hooks/mutations/useCreatePaymentMethodMutation';
import {
  paymentMethodSchema,
  PaymentMethodFormValues,
} from '../../schema/paymentMethodSchema';
import { PaymentMethodForm } from '../paymentMethodForm';

function DialogCreatePaymentMethod() {
  const { mutate: createPaymentMethod, isPending } =
    useCreatePaymentMethodMutation();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<PaymentMethodFormValues>({
    resolver: zodResolver(paymentMethodSchema),
    defaultValues: { name: '', type: undefined, brand: '', last_four_digits: '', closing_day: undefined, due_day: undefined },
  });

  const onSubmit = (data: PaymentMethodFormValues) => {
    createPaymentMethod(
      {
        user_id: 1,
        name: data.name,
        type: data.type,
        brand: data.brand || undefined,
        last_four_digits: data.last_four_digits || undefined,
        closing_day: data.closing_day,
        due_day: data.due_day,
      },
      {
        onSuccess: () => {
          toast.success('Método de pagamento criado com sucesso!');
          reset();
        },
        onError: () => toast.error('Erro ao criar método de pagamento.'),
      },
    );
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <CirclePlus />
          Método de Pagamento
        </Button>
      </DialogTrigger>

      <DialogContent className='sm:max-w-md'>
        <DialogHeader>
          <DialogTitle>Novo Método de Pagamento</DialogTitle>
          <DialogDescription>
            Cadastre um cartão ou meio de pagamento para usar nas despesas.
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
            <Button type='button' variant='destructive'>
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

export { DialogCreatePaymentMethod };
