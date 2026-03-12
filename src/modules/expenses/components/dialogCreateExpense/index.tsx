import { zodResolver } from '@hookform/resolvers/zod';
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
import { CirclePlus } from 'lucide-react';
import { useState } from 'react';
import { Resolver, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { useListingPaymentMethodsQuery } from '../../submodules/paymentMethods/hooks/queries/useListingPaymentMethodsQuery';
import { useCreateExpenseMutation } from '../../hooks/mutations/useCreateExpenseMutation';
import { useListingExpenseCategoriesQuery } from '../../submodules/expenseCategories/hooks/queries/useListingExpenseCategoriesQuery';
import { createExpenseDefaultValues } from '../../schema/createExpenseDefaultValues';
import {
  CreateExpenseSchema,
  createExpenseSchema,
} from '../../schema/createExpenseSchema';
import { CreateExpenseInputDto } from '../../services/postExpense/postExpense.dto';
import { FormCreateExpense } from '../formCreateExpense';

function DialogCreateExpense() {
  const [open, setOpen] = useState(false);

  const { data: categories = [] } = useListingExpenseCategoriesQuery();
  const { data: paymentMethods = [] } = useListingPaymentMethodsQuery();

  const { mutate: createExpense, isPending } = useCreateExpenseMutation();

  const form = useForm<CreateExpenseSchema>({
    resolver: zodResolver(createExpenseSchema) as Resolver<CreateExpenseSchema>,
    defaultValues: createExpenseDefaultValues,
  });

  const onSubmit = (data: CreateExpenseSchema) => {
    const params: CreateExpenseInputDto = {
      user_id: 1,
      date: data.date,
      description: data.description,
      amount: data.amount,
      payment_type_id: Number(data.payment_type_id),
      status: data.status,
      item: data.item || undefined,
      notes: data.notes || undefined,
      subcategory_id: data.subcategory_id
        ? Number(data.subcategory_id)
        : undefined,
      installment_current: data.is_recurrent ? undefined : data.installment_current,
      installment_total: data.is_recurrent ? undefined : data.installment_total,
      is_recurrent: data.is_recurrent || undefined,
      recurrence_end_date: data.is_recurrent && data.recurrence_end_date
        ? data.recurrence_end_date
        : undefined,
    };

    createExpense(params, {
      onSuccess: () => {
        toast.success('Despesa cadastrada com sucesso!');
        form.reset(createExpenseDefaultValues);
        setOpen(false);
      },
      onError: () => {
        toast.error('Erro ao salvar a despesa. Tente novamente.');
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <CirclePlus />
          Despesa
        </Button>
      </DialogTrigger>

      <DialogContent className='sm:max-w-125'>
        <DialogHeader>
          <DialogTitle>Cadastro de Despesa</DialogTitle>
          <DialogDescription>
            Preencha as informações abaixo para adicionar uma nova despesa às
            suas finanças.
          </DialogDescription>
        </DialogHeader>

        <FormCreateExpense
          form={form}
          categories={categories}
          paymentMethods={paymentMethods}
        />

        <DialogFooter>
          <DialogClose asChild>
            <Button type='button' variant='destructive'>
              Cancelar
            </Button>
          </DialogClose>
          <Button
            type='button'
            onClick={() => form.handleSubmit(onSubmit)()}
            disabled={isPending}
          >
            {isPending ? 'Salvando...' : 'Salvar'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export { DialogCreateExpense };
