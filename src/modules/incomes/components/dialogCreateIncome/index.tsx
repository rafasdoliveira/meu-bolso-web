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
import { useCreateIncomeMutation } from '../../hooks/mutations/useCreateIncomeMutation';
import { useListingIncomesStatusQuery } from '../../hooks/queries/useListingIncomesStatusQuery';
import { useListingPaymentTypesQuery } from '../../hooks/queries/useListingPaymentTypesQuery';
import { useListingSourcesQuery } from '../../hooks/queries/useListingSourcesQuery';
import { createIncomeDefaultValues } from '../../schema/createIncomeDefaultValues';
import {
  CreateIncomeSchema,
  createIncomeSchema,
} from '../../schema/createIncomeSchema';
import { CreateIncomeInputDto } from '../../services/postIncomes/postIncomes.dto';
import { FormCreateIncome } from '../formCreateIncome';
import { toast } from 'sonner';

function DialogCreateIncome() {
  const [open, setOpen] = useState(false);

  const { data: sources = [] } = useListingSourcesQuery();
  const { data: paymentTypes = [] } = useListingPaymentTypesQuery();
  const { data: incomeStatus = [] } = useListingIncomesStatusQuery();

  const { mutate: createIncome, isPending } = useCreateIncomeMutation();

  const form = useForm<CreateIncomeSchema>({
    resolver: zodResolver(createIncomeSchema) as Resolver<CreateIncomeSchema>,
    defaultValues: createIncomeDefaultValues,
  });

  const onSubmit = (data: CreateIncomeSchema) => {
    const params: CreateIncomeInputDto = {
      user_id: 1,
      date: data.date,
      source_id: Number(data.source_id),
      amount: data.amount,
      notes: data.notes,
      payment_type_id: Number(data.payment_type_id),
      status_id: Number(data.status_id),
    };

    createIncome(params, {
      onSuccess: () => {
        toast.success('Receita cadastrada com sucesso!');
        form.reset(createIncomeDefaultValues);
        setOpen(false);
      },
      onError: () => {
        toast.error('Erro ao salvar a receita. Tente novamente.');
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <CirclePlus />
          Receita
        </Button>
      </DialogTrigger>

      <DialogContent className='sm:max-w-md'>
        <DialogHeader>
          <DialogTitle>Cadastro de Receita</DialogTitle>
          <DialogDescription>
            Preencha as informações abaixo para adicionar uma nova receita às
            suas finanças.
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

export { DialogCreateIncome };
