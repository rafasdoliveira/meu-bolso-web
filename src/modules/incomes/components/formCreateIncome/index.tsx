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
import { GetIncomesStatusOutputDto } from '../../services/getIncomesStatus/getIncomesStatus.dto';
import { GetPaymentTypesOutputDto } from '../../services/getPaymentTypes/getPaymentTypes.dto';
import { GetSourcesOutputDto } from '../../services/getSources/getSources.dto';
import Form from '@components/form';

interface FormCreateIncomeProps {
  sources: GetSourcesOutputDto;
  paymentTypes: GetPaymentTypesOutputDto;
  form: UseFormReturn<CreateIncomeSchema>;
  incomeStatus: GetIncomesStatusOutputDto;
}

function FormCreateIncome({ form, incomeStatus, sources, paymentTypes }: Readonly<FormCreateIncomeProps>) {
  return (
    <Form form={form}>
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
                    {sources.map((source) => (
                      <SelectItem key={source.id} value={String(source.id)}>{source.name}</SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          />
        </div>
        <div className='my-2'>
          <Label className='mb-2 font-semibold'>Forma de Recebimento</Label>
          <Controller
            name='payment_type_id'
            control={form.control}
            render={({ field }) => {
              return (
                <Select
                  value={field.value}
                  onValueChange={field.onChange}
                >
                  <SelectTrigger className='w-full'>
                    <SelectValue placeholder='Informe o tipo de recebimento' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Tipo de Recebimento</SelectLabel>
                      {paymentTypes.map((paymentType) => (
                        <SelectItem key={paymentType.id} value={String(paymentType.id)}>{paymentType.name}</SelectItem>
                      ))}
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
            name='status_id'
            control={form.control}
            render={({ field }) => {
              return (
                <Select
                  value={field.value}
                  onValueChange={field.onChange}
                >
                  <SelectTrigger className='w-full'>
                    <SelectValue placeholder='Informe o status' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Status</SelectLabel>
                      {incomeStatus.map((status) => (
                        <SelectItem key={status.id} value={String(status.id)}>{status.name}</SelectItem>
                      ))}
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
      <TextInput
        divClassName='my-4'
        control={form.control}
        label='Observação'
        name='notes'
        type='text'
        placeholder='Deixe uma observação'
        required
      />
    </div>
    </Form>
  );
}

export { FormCreateIncome };
