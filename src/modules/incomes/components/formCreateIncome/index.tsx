import TextInput from '@components/textInput';
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
import { Controller, UseFormReturn } from 'react-hook-form';
import { CreateIncomeSchema } from '../../schema/createIncomeSchema';

interface FormCreateIncomeProps {
  form: UseFormReturn<CreateIncomeSchema>;
}

function FormCreateIncome({ form }: Readonly<FormCreateIncomeProps>) {
  return (
    <div>
      <div className='grid grid-cols-2 gap-2'>
        <div className='my-2'>
          <Label className='mb-2 font-semibold'>Fonte da Receita</Label>
          <Controller
            name='source_id'
            control={form.control}
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger className='w-full'>
                  <SelectValue placeholder='Informe a fonte' />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Fonte da Receita</SelectLabel>
                    <SelectItem value='apple'>Apple</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
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
                  <SelectTrigger className='w-full'>
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
                  <SelectTrigger className='w-full'>
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
        divClassName='my-4'
        control={form.control}
        label='Valor Recebido'
        name='amount'
        type='number'
        placeholder='Informe o valor recebido'
        required
      />
      <div className='my-4 w-full'>
        <Label className='mb-2 font-semibold'>Repetição</Label>
        <Controller
          name='payment_type'
          control={form.control}
          render={({ field }) => {
            return (
              <Select
                value={field.value.toString()}
                onValueChange={field.onChange}
              >
                <SelectTrigger className='w-full'>
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
        divClassName='my-4'
        control={form.control}
        label='Observação'
        name='amount'
        type='number'
        placeholder='Deixe uma observação'
        required
      />
    </div>
  );
}

export { FormCreateIncome };
