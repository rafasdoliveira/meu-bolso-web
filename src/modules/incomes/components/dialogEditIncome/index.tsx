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
import { Income } from '@shared/types/income';
import { useEffect } from 'react';
import { Resolver, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { useUpdateIncomeMutation } from '../../hooks/mutations/useUpdateIncomeMutation';
import { useListingIncomesStatusQuery } from '../../hooks/queries/useListingIncomesStatusQuery';
import { useListingPaymentTypesQuery } from '../../hooks/queries/useListingPaymentTypesQuery';
import { useListingSourcesQuery } from '../../hooks/queries/useListingSourcesQuery';
import {
  CreateIncomeSchema,
  createIncomeSchema,
} from '../../schema/createIncomeSchema';
import { UpdateIncomeInputDto } from '../../services/putIncomes/putIncomes.dto';
import { FormCreateIncome } from '../formCreateIncome';

type Props = {
  income: Income | null;
  onClose: () => void;
};

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

function DialogEditIncome({ income, onClose }: Readonly<Props>) {
  const { data: sources = [] } = useListingSourcesQuery();
  const { data: paymentTypes = [] } = useListingPaymentTypesQuery();
  const { data: incomeStatus = [] } = useListingIncomesStatusQuery();
  const { mutate: updateIncome, isPending } = useUpdateIncomeMutation();

  const form = useForm<CreateIncomeSchema>({
    resolver: zodResolver(createIncomeSchema) as Resolver<CreateIncomeSchema>,
  });

  useEffect(() => {
    if (!income) return;

    const sourceId =
      income.source_id ??
      sources.find((s) => s.name === income.source)?.id;

    const paymentTypeId =
      income.payment_type_id ??
      paymentTypes.find((pt) => pt.name === income.paymentType)?.id;

    const statusId =
      income.status_id ??
      incomeStatus.find((s) => s.name === income.status)?.id;

    form.reset({
      date: toInputDate(income.date),
      source_id: sourceId ? String(sourceId) : '',
      amount: Number(income.amount),
      notes: income.notes ?? '',
      payment_type_id: paymentTypeId ? String(paymentTypeId) : '',
      status_id: statusId ? String(statusId) : '',
    });
  }, [income, sources, paymentTypes, incomeStatus, form]);

  const onSubmit = (data: CreateIncomeSchema) => {
    if (!income) return;

    const params: UpdateIncomeInputDto = {
      id: income.id,
      date: data.date,
      source_id: Number(data.source_id),
      amount: data.amount,
      notes: data.notes || undefined,
      payment_type_id: Number(data.payment_type_id),
      status_id: Number(data.status_id),
    };

    updateIncome(params, {
      onSuccess: () => {
        toast.success('Receita atualizada com sucesso!');
        onClose();
      },
      onError: () => {
        toast.error('Erro ao atualizar a receita. Tente novamente.');
      },
    });
  };

  return (
    <Dialog open={Boolean(income)} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className='sm:max-w-md'>
        <DialogHeader>
          <DialogTitle>Editar Receita</DialogTitle>
          <DialogDescription>
            Altere as informações da receita abaixo.
          </DialogDescription>
        </DialogHeader>

        <FormCreateIncome
          form={form}
          incomeStatus={incomeStatus}
          sources={sources}
          paymentTypes={paymentTypes}
        />

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

export { DialogEditIncome };
