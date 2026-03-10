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
import { Controller, UseFormReturn } from 'react-hook-form';
import { CreateExpenseSchema } from '../../schema/createExpenseSchema';
import { GetExpenseCategoriesOutputDto } from '../../services/getExpenseCategories/getExpenseCategories.dto';
import { GetPaymentTypesOutputDto } from '@modules/incomes/services/getPaymentTypes/getPaymentTypes.dto';

interface FormCreateExpenseProps {
  form: UseFormReturn<CreateExpenseSchema>;
  categories: GetExpenseCategoriesOutputDto;
  paymentTypes: GetPaymentTypesOutputDto;
}

function FormCreateExpense({ form, categories, paymentTypes }: Readonly<FormCreateExpenseProps>) {
  const selectedCategoryId = form.watch('subcategory_id')?.split('-')[0];
  const selectedCategory = categories.find((c) => String(c.id) === selectedCategoryId);

  return (
    <Form form={form}>
      <div>
        <div className='grid grid-cols-2 gap-2'>
          <TextInput
            divClassName='px-0'
            control={form.control}
            label='Data da despesa'
            name='date'
            type='date'
            required
          />
          <div className='my-2'>
            <Label className='mb-2 font-semibold'>Tipo de Pagamento</Label>
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
                      <SelectLabel>Tipo de Pagamento</SelectLabel>
                      {paymentTypes.map((pt) => (
                        <SelectItem key={pt.id} value={String(pt.id)}>
                          {pt.name}
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
                          <SelectItem
                            key={sub.id}
                            value={String(sub.id)}
                          >
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
        <div className='grid grid-cols-2 gap-2'>
          <TextInput
            divClassName='my-2'
            control={form.control}
            label='Item'
            name='item'
            type='text'
            placeholder='Ex: Notebook'
          />
          <TextInput
            divClassName='my-2'
            control={form.control}
            label='Observação'
            name='notes'
            type='text'
            placeholder='Deixe uma observação'
          />
          <TextInput
            divClassName='my-2'
            control={form.control}
            label='Parcela atual'
            name='installment_current'
            type='number'
            placeholder='Ex: 1'
          />
          <TextInput
            divClassName='my-2'
            control={form.control}
            label='Total de parcelas'
            name='installment_total'
            type='number'
            placeholder='Ex: 12'
          />
        </div>
      </div>
    </Form>
  );
}

export { FormCreateExpense };
