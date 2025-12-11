import { z } from 'zod';

export const createIncomeSchema = z.object({
  date: z.string().refine((val) => !Number.isNaN(Date.parse(val)), {
    message:
      'O campo Data é obrigatório e deve ser uma data válida (YYYY-MM-DD)',
  }),
  source_id: z
    .number({
      message: 'O campo Fonte de Renda é obrigatório e deve ser um número',
    })
    .int('O campo Fonte de Renda deve ser um número inteiro'),
  amount: z.number({
    message: 'O campo Valor é obrigatório e deve ser um número',
  }),
  notes: z.string({ message: 'O campo Observações deve ser texto' }).optional(),
  payment_type: z
    .number({ message: 'O campo Tipo de Pagamento é obrigatório' })
    .int('O campo Tipo de Pagamento deve ser um número inteiro'),
  status: z
    .number({ message: 'O campo Status é obrigatório' })
    .int('O campo Status deve ser um número inteiro'),
});

export type CreateIncomeSchema = z.infer<typeof createIncomeSchema>;
