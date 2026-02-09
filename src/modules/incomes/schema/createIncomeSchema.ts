import { z } from 'zod';

  export const createIncomeSchema = z.object({
    date: z.string().refine((val) => !Number.isNaN(Date.parse(val)), {
      message:
        'O campo Data é obrigatório e deve ser uma data válida (YYYY-MM-DD)',
    }),
    source_id: z.string({
      message: 'O campo Fonte de Renda é obrigatório.',
    }),
    amount: z.coerce
      .number()
      .refine((v) => !Number.isNaN(v), {
        message: 'Valor é obrigatório',
      })
      .positive('O valor deve ser maior que zero'),
    notes: z.string({ message: 'O campo Observações deve ser texto' }).optional(),
    payment_type_id: z.string({
      message: 'O campo Tipo de Pagamento é obrigatório',
    }),
    status_id: z.string({ message: 'O campo Status é obrigatório' }),
  });

export type CreateIncomeSchema = z.infer<typeof createIncomeSchema>;
