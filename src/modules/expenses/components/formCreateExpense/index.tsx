import Form from '@components/form';
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
import { Switch } from '@components/ui/switch';
import { Info } from 'lucide-react';
import { Controller, UseFormReturn, useWatch } from 'react-hook-form';
import { CreateExpenseSchema } from '../../schema/createExpenseSchema';
import { GetExpenseCategoriesOutputDto } from '../../submodules/expenseCategories/services/getExpenseCategories/getExpenseCategories.dto';
import { GetPaymentMethodsOutputDto } from '../../submodules/paymentMethods/services/getPaymentMethods/getPaymentMethods.dto';

interface FormCreateExpenseProps {
  form: UseFormReturn<CreateExpenseSchema>;
  categories: GetExpenseCategoriesOutputDto;
  paymentMethods: GetPaymentMethodsOutputDto;
}

function FormCreateExpense({
  form,
  categories,
  paymentMethods,
}: Readonly<FormCreateExpenseProps>) {
  const isRecurrent = useWatch({ control: form.control, name: 'is_recurrent' });

  return (
    <Form form={form}>
      <div>
        <div className='grid grid-cols-2 gap-2'>
          <TextInput
            divClassName='flex flex-col justify-end'
            labelClassName='font-semibold'
            inputClassName='my-2'
            control={form.control}
            label='Data da despesa'
            name='date'
            type='date'
            required
          />
          <div className='my-2'>
            <Label className='mb-2 font-semibold'>Método de Pagamento</Label>
            <Controller
              name='payment_type_id'
              control={form.control}
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className='w-full'>
                    <SelectValue placeholder='Selecione' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Método de Pagamento</SelectLabel>
                      {paymentMethods.map((pm) => (
                        <SelectItem key={pm.id} value={String(pm.id)}>
                          {pm.name}
                          {pm.last_four_digits && ` •••• ${pm.last_four_digits}`}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              )}
            />
          </div>
          <div className='my-2'>
            <Label className='mb-2 font-semibold'>Status</Label>
            <Controller
              name='status'
              control={form.control}
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className='w-full'>
                    <SelectValue placeholder='Selecione' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='pending'>Pendente</SelectItem>
                    <SelectItem value='paid'>Pago</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
          </div>
          <div className='my-2'>
            <Label className='mb-2 font-semibold'>Categoria</Label>
            <Controller
              name='subcategory_id'
              control={form.control}
              render={({ field }) => (
                <Select
                  value={field.value}
                  onValueChange={(val) => {
                    field.onChange(val);
                  }}
                >
                  <SelectTrigger className='w-full'>
                    <SelectValue placeholder='Selecione' />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectGroup key={category.id}>
                        <SelectLabel>{category.name}</SelectLabel>
                        {category.subcategories.map((sub) => (
                          <SelectItem key={sub.id} value={String(sub.id)}>
                            {sub.name}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
          </div>
        </div>
        <TextInput
          divClassName='my-2'
          control={form.control}
          label='Descrição'
          name='description'
          type='text'
          placeholder='Ex: Supermercado'
          required
        />
        <TextInput
          divClassName='my-2'
          control={form.control}
          label='Valor'
          name='amount'
          type='number'
          placeholder='0,00'
          required
        />

        {/* Recurrence toggle */}
        <div className='my-3 flex items-center gap-3'>
          <Controller
            name='is_recurrent'
            control={form.control}
            render={({ field }) => (
              <Switch
                id='is_recurrent'
                checked={field.value ?? false}
                onCheckedChange={(checked) => {
                  field.onChange(checked);
                  if (checked) {
                    form.setValue('installment_current', undefined);
                    form.setValue('installment_total', undefined);
                  }
                }}
              />
            )}
          />
          <Label htmlFor='is_recurrent' className='cursor-pointer font-semibold'>Despesa Recorrente</Label>
        </div>

        {isRecurrent && (
          <div className='mb-3 flex items-start gap-2 rounded-md border border-amber-300 bg-amber-50 px-3 py-2 text-sm text-amber-800 dark:border-amber-600 dark:bg-amber-950 dark:text-amber-300'>
            <Info className='mt-0.5 size-4 shrink-0' />
            <span>
              A despesa será lançada mensalmente. Informe uma data de término para limitar a recorrência ou deixe em branco para continuar por 24 meses.
            </span>
          </div>
        )}

        {isRecurrent ? (
          <TextInput
            divClassName='my-2'
            control={form.control}
            label='Data de término da recorrência (opcional)'
            name='recurrence_end_date'
            type='date'
            required={false}
          />
        ) : (
          <div className='grid grid-cols-2 gap-2'>
            <TextInput
              divClassName='my-2'
              control={form.control}
              label='Item'
              name='item'
              type='text'
              placeholder='Ex: Notebook'
              required={false}
            />
            <TextInput
              divClassName='my-2'
              control={form.control}
              label='Observação'
              name='notes'
              type='text'
              placeholder='Deixe uma observação'
              required={false}
            />
            <TextInput
              divClassName='my-2'
              control={form.control}
              label='Parcela atual'
              name='installment_current'
              type='number'
              placeholder='Ex: 1'
              min={1}
              required={false}
            />
            <TextInput
              divClassName='my-2'
              control={form.control}
              label='Total de parcelas'
              name='installment_total'
              type='number'
              placeholder='Ex: 12'
              min={1}
              required={false}
            />
          </div>
        )}
      </div>
    </Form>
  );
}

export { FormCreateExpense };
