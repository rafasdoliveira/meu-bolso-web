import { zodResolver } from '@hookform/resolvers/zod';
import Form from '@shared/components/form/index';
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
import { useForm } from 'react-hook-form';
import { useListingIncomesStatusQuery } from '../../hooks/useListingIncomesStatusQuery';
import { useListingSourcesQuery } from '../../hooks/useListingSourcesQuery';
import { createIncomeDefaultValues } from '../../schema/createIncomeDefaultValues';
import { createIncomeSchema } from '../../schema/createIncomeSchema';
import { FormCreateIncome } from '../formCreateIncome';
import { useListingPaymentTypesQuery } from '../../hooks/useListingPaymentTypesQuery';

function DialogCreateIncome() {
  const { data: sources } = useListingSourcesQuery();
  const { data: paymentTypes } = useListingPaymentTypesQuery();
  const { data: incomeStatus } = useListingIncomesStatusQuery();

  const form = useForm({
    resolver: zodResolver(createIncomeSchema),
    defaultValues: createIncomeDefaultValues,
  });

  return (
    <Dialog>
      <Form form={form}>
        <DialogTrigger asChild>
          <Button variant='default'>
            <CirclePlus />
            Receita
          </Button>
        </DialogTrigger>
        <DialogContent className='sm:max-w-[425px]'>
          <DialogHeader>
            <DialogTitle>Cadastro de Receita</DialogTitle>
            <DialogDescription>
              Preencha as informações abaixo para adicionar uma nova receita às
              suas finanças.
            </DialogDescription>
          </DialogHeader>
          <div>
            <FormCreateIncome form={form} incomeStatus={incomeStatus} sources={sources} paymentTypes={paymentTypes} />
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant='destructive'>Cancelar</Button>
            </DialogClose>
            <Button type='submit'>Salvar</Button>
          </DialogFooter>
        </DialogContent>
      </Form>
    </Dialog>
  );
}

export { DialogCreateIncome };
