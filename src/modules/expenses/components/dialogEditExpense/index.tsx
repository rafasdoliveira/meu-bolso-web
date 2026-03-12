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
} from '@shared/components/ui/dialog';
import { Label } from '@shared/components/ui/label';
import { Expense } from '@shared/types/expense';
import { useEffect, useState } from 'react';
import { Resolver, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { useListingPaymentMethodsQuery } from '../../submodules/paymentMethods/hooks/queries/useListingPaymentMethodsQuery';
import { useUpdateExpenseMutation } from '../../hooks/mutations/useUpdateExpenseMutation';
import { useListingExpenseCategoriesQuery } from '../../submodules/expenseCategories/hooks/queries/useListingExpenseCategoriesQuery';
import {
  CreateExpenseSchema,
  createExpenseSchema,
} from '../../schema/createExpenseSchema';
import { UpdateExpenseInputDto } from '../../services/putExpense/putExpense.dto';
import { FormCreateExpense } from '../formCreateExpense';

type Props = {
  expense: Expense | null;
  onClose: () => void;
};

function parseInstallment(installment?: string) {
  if (!installment) return { current: undefined, total: undefined };
  const [current, total] = installment.split('/');
  return { current: Number(current), total: Number(total) };
}

function toInputDate(date: string): string {
  if (/^\d{4}-\d{2}-\d{2}/.test(date)) return date.substring(0, 10);
  if (/^\d{2}\/\d{2}\/\d{4}$/.test(date)) {
    const [day, month, year] = date.split('/');
    return `${year}-${month}-${day}`;
  }
  const parsed = new Date(date);
  if (!Number.isNaN(parsed.getTime())) return parsed.toISOString().substring(0, 10);
  return date;
}

function DialogEditExpense({ expense, onClose }: Readonly<Props>) {
  const [updateAll, setUpdateAll] = useState(false);

  const { data: categories = [] } = useListingExpenseCategoriesQuery();
  const { data: paymentMethods = [] } = useListingPaymentMethodsQuery();
  const { mutate: updateExpense, isPending } = useUpdateExpenseMutation();

  const isSeries = Boolean(expense?.installment || expense?.is_recurrent);

  const form = useForm<CreateExpenseSchema>({
    resolver: zodResolver(createExpenseSchema) as Resolver<CreateExpenseSchema>,
  });

  useEffect(() => {
    if (!expense) return;
    setUpdateAll(false);

    const { current, total } = parseInstallment(expense.installment);

    const paymentMethodId =
      expense.payment_method_id ??
      paymentMethods.find((pm) => pm.name === expense.paymentType)?.id;

    let subcategoryId = expense.subcategory_id;
    if (!subcategoryId && expense.subcategory) {
      for (const cat of categories) {
        const found = cat.subcategories.find((sub) => sub.name === expense.subcategory);
        if (found) { subcategoryId = found.id; break; }
      }
    }

    form.reset({
      date: toInputDate(expense.date),
      description: expense.description,
      amount: Number(expense.amount),
      payment_type_id: paymentMethodId ? String(paymentMethodId) : '',
      status: expense.status as 'pending' | 'paid',
      item: expense.item ?? '',
      notes: expense.notes ?? '',
      subcategory_id: subcategoryId ? String(subcategoryId) : '',
      installment_current: current,
      installment_total: total,
      is_recurrent: expense.is_recurrent ?? false,
    });
  }, [expense, paymentMethods, categories, form]);

  const onSubmit = (data: CreateExpenseSchema) => {
    if (!expense) return;

    const params: UpdateExpenseInputDto = {
      id: expense.id,
      update_all: isSeries && updateAll ? true : undefined,
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

    updateExpense(params, {
      onSuccess: () => {
        toast.success('Despesa atualizada com sucesso!');
        onClose();
      },
      onError: () => {
        toast.error('Erro ao atualizar a despesa. Tente novamente.');
      },
    });
  };

  return (
    <Dialog open={Boolean(expense)} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className='sm:max-w-125'>
        <DialogHeader>
          <DialogTitle>Editar Despesa</DialogTitle>
          <DialogDescription>
            Altere as informações da despesa abaixo.
          </DialogDescription>
        </DialogHeader>

        <FormCreateExpense
          form={form}
          categories={categories}
          paymentMethods={paymentMethods}
        />

        {isSeries && (
          <div className='flex items-center gap-3 rounded-lg border border-yellow-200 bg-yellow-50 px-3 py-2'>
            <input
              type='checkbox'
              id='update_all'
              className='h-4 w-4 cursor-pointer accent-primary'
              checked={updateAll}
              onChange={(e) => setUpdateAll(e.target.checked)}
            />
            <Label htmlFor='update_all' className='cursor-pointer text-sm text-yellow-800'>
              {expense?.is_recurrent
                ? 'Atualizar todas as ocorrências da série'
                : 'Atualizar todas as parcelas da série'}
            </Label>
          </div>
        )}

        <DialogFooter>
          <DialogClose asChild>
            <Button type='button' variant='destructive' onClick={onClose}>
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

export { DialogEditExpense };
