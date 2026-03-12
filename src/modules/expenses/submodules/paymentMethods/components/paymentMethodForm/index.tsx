import { Input } from '@shared/components/ui/input';
import { Label } from '@shared/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@shared/components/ui/select';
import { UseFormRegister, FieldErrors, UseFormSetValue, UseFormWatch } from 'react-hook-form';
import { PaymentMethodFormValues } from '../../schema/paymentMethodSchema';

const PAYMENT_TYPES = [
  { value: 'credit_card', label: 'Cartão de Crédito' },
  { value: 'debit_card', label: 'Cartão de Débito' },
  { value: 'pix', label: 'Pix' },
  { value: 'cash', label: 'Dinheiro' },
];

type Props = {
  register: UseFormRegister<PaymentMethodFormValues>;
  errors: FieldErrors<PaymentMethodFormValues>;
  setValue: UseFormSetValue<PaymentMethodFormValues>;
  watch: UseFormWatch<PaymentMethodFormValues>;
};

function PaymentMethodForm({ register, errors, setValue, watch }: Props) {
  const type = watch('type');
  const isCard = type === 'credit_card' || type === 'debit_card';

  return (
    <div className='space-y-4'>
      <div className='space-y-1.5'>
        <Label htmlFor='pm-name'>Nome</Label>
        <Input
          id='pm-name'
          placeholder='Ex: Nubank, Inter...'
          {...register('name')}
        />
        {errors.name && (
          <p className='text-destructive text-sm'>{errors.name.message}</p>
        )}
      </div>

      <div className='space-y-1.5'>
        <Label>Tipo</Label>
        <Select
          value={type}
          onValueChange={(val) =>
            setValue('type', val as PaymentMethodFormValues['type'], {
              shouldValidate: true,
            })
          }
        >
          <SelectTrigger>
            <SelectValue placeholder='Selecione o tipo' />
          </SelectTrigger>
          <SelectContent>
            {PAYMENT_TYPES.map((t) => (
              <SelectItem key={t.value} value={t.value}>
                {t.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.type && (
          <p className='text-destructive text-sm'>{errors.type.message}</p>
        )}
      </div>

      {isCard && (
        <>
          <div className='space-y-1.5'>
            <Label htmlFor='pm-brand'>Bandeira</Label>
            <Input
              id='pm-brand'
              placeholder='Ex: Visa, Mastercard...'
              {...register('brand')}
            />
          </div>
          <div className='space-y-1.5'>
            <Label htmlFor='pm-digits'>Últimos 4 dígitos</Label>
            <Input
              id='pm-digits'
              placeholder='0000'
              maxLength={4}
              {...register('last_four_digits')}
            />
            {errors.last_four_digits && (
              <p className='text-destructive text-sm'>
                {errors.last_four_digits.message}
              </p>
            )}
          </div>
          {type === 'credit_card' && (
            <div className='grid grid-cols-2 gap-3'>
              <div className='space-y-1.5'>
                <Label htmlFor='pm-closing'>Dia de fechamento</Label>
                <Input
                  id='pm-closing'
                  type='number'
                  placeholder='Ex: 26'
                  min={1}
                  max={31}
                  {...register('closing_day')}
                />
                {errors.closing_day && (
                  <p className='text-destructive text-sm'>{errors.closing_day.message}</p>
                )}
              </div>
              <div className='space-y-1.5'>
                <Label htmlFor='pm-due'>Dia de vencimento</Label>
                <Input
                  id='pm-due'
                  type='number'
                  placeholder='Ex: 10'
                  min={1}
                  max={31}
                  {...register('due_day')}
                />
                {errors.due_day && (
                  <p className='text-destructive text-sm'>{errors.due_day.message}</p>
                )}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export { PaymentMethodForm };
