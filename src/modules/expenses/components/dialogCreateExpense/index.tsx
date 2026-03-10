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
import { Resolver, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { useListingPaymentTypesQuery } from '@modules/incomes/hooks/queries/useListingPaymentTypesQuery';
import { useCreateExpenseMutation } from '../../hooks/mutations/useCreateExpenseMutation';
import { useListingExpenseCategoriesQuery } from '../../hooks/queries/useListingExpenseCategoriesQuery';
import { createExpenseDefaultValues } from '../../schema/createExpenseDefaultValues';
import { CreateExpenseSchema, createExpenseSchema } from '../../schema/createExpenseSchema';
import { CreateExpenseInputDto } from '../../services/postExpense/postExpense.dto';
import { FormCreateExpense } from '../formCreateExpense';

function DialogCreateExpense() {
  const { data: categories = [] } = useListingExpenseCategoriesQuery();
  const { data: paymentTypes = [] } = useListingPaymentTypesQuery();

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
      subcategory_id: data.subcategory_id ? Number(data.subcategory_id) : undefined,
      installment_current: data.installment_current,
      installment_total: data.installment_total,
    };

    try {
      createExpense(params);
      toast.success('Despesa cadastrada com sucesso!');
      form.reset();
    } catch (error) {
      console.log(error);
      form.setError('root', {
        type: 'server',
        message: 'Erro ao salvar a despesa. Tente novamente.',
      });
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <CirclePlus />
          Despesa
        </Button>
      </DialogTrigger>

      <DialogContent className='sm:max-w-[500px]'>
        <DialogHeader>
          <DialogTitle>Cadastro de Despesa</DialogTitle>
          <DialogDescription>
            Preencha as informações abaixo para adicionar uma nova despesa às suas finanças.
          </DialogDescription>
        </DialogHeader>

        <FormCreateExpense
          form={form}
          categories={categories}
          paymentTypes={paymentTypes}
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
