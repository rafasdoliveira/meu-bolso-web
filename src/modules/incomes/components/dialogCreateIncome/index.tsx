import { Label } from '@components/ui/label';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@components/ui/select';
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
import { Controller, useForm } from 'react-hook-form';
import { createIncomeDefaultValues } from '../../schema/createIncomeDefaultValues';
import { createIncomeSchema } from '../../schema/createIncomeSchema';
import TextInput from '@components/textInput';

function DialogCreateIncome() {
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
          <div className='grid grid-cols-2 gap-2'>
            <div className='my-2'>
              <Label className='mb-2 font-semibold'>Fonte da Receita</Label>
              <Controller
                name='source_id'
                control={form.control}
                render={({ field }) => {
                  return (
                    <Select
                      value={field.value.toString()}
                      onValueChange={field.onChange}
                    >
                      <SelectTrigger className='w-[180px]'>
                        <SelectValue placeholder='Select a fruit' />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Fruits</SelectLabel>
                          <SelectItem value='apple'>Apple</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  );
                }}
              />
            </div>
            <div className='my-2'>
              <Label className='mb-2 font-semibold'>Forma de Recebimento</Label>
              <Controller
                name='payment_type'
                control={form.control}
                render={({ field }) => {
                  return (
                    <Select
                      value={field.value.toString()}
                      onValueChange={field.onChange}
                    >
                      <SelectTrigger className='w-[180px]'>
                        <SelectValue placeholder='Select a fruit' />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Fruits</SelectLabel>
                          <SelectItem value='apple'>Apple</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  );
                }}
              />
            </div>
            <TextInput
              divClassName='px-0'
              control={form.control}
              label='Data do recebimento'
              name='date'
              type='date'
              required
            />
            <div>
              <Label className='mb-2 font-semibold'>Status</Label>
              <Controller
                name='payment_type'
                control={form.control}
                render={({ field }) => {
                  return (
                    <Select
                      value={field.value.toString()}
                      onValueChange={field.onChange}
                    >
                      <SelectTrigger className='w-[180px]'>
                        <SelectValue placeholder='Select a fruit' />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Fruits</SelectLabel>
                          <SelectItem value='apple'>Apple</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  );
                }}
              />
            </div>
          </div>
          <TextInput
            divClassName='px-0'
            control={form.control}
            label='Valor Recebido'
            name='amount'
            type='number'
            placeholder='Informe o valor recebido'
            required
          />
          <TextInput
            divClassName='px-0'
            control={form.control}
            label='Observação'
            name='amount'
            type='number'
            placeholder='Deixe uma observação'
            required
          />
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
