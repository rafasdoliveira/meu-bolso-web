import { z } from 'zod';

const optionalDay = z.preprocess(
  (val) => (val === '' || val === null || val === undefined ? undefined : Number(val)),
  z.number().int().min(1).max(31).optional(),
);

export const paymentMethodSchema = z.object({
  name: z.string().min(1, 'Informe o nome do meio de pagamento.'),
  type: z.enum(['credit_card', 'debit_card', 'pix', 'cash'], {
    message: 'Selecione um tipo válido.',
  }),
  brand: z.string().optional(),
  last_four_digits: z
    .string()
    .length(4, 'Informe exatamente 4 dígitos.')
    .optional()
    .or(z.literal('')),
  closing_day: optionalDay,
  due_day: optionalDay,
});

export type PaymentMethodFormValues = z.infer<typeof paymentMethodSchema>;
