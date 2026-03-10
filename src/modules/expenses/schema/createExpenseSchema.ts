import { z } from 'zod';

export const createExpenseSchema = z.object({
  date: z.string().refine((val) => !Number.isNaN(Date.parse(val)), {
    message: 'O campo Data é obrigatório e deve ser uma data válida (YYYY-MM-DD)',
  }),
  description: z
    .string({ message: 'O campo Gasto é obrigatório' })
    .min(1, 'O campo Gasto é obrigatório'),
  amount: z.coerce
    .number()
    .refine((v) => !Number.isNaN(v), { message: 'Valor é obrigatório' })
    .positive('O valor deve ser maior que zero'),
  payment_type_id: z.string({ message: 'O campo Tipo de Pagamento é obrigatório' }),
  status: z.enum(['pending', 'paid'], { message: 'Status deve ser "pending" ou "paid"' }),
  installment_current: z.coerce.number().int().min(1).optional(),
  installment_total: z.coerce.number().int().min(1).optional(),
  item: z.string().optional(),
  notes: z.string().optional(),
  subcategory_id: z.string().optional(),
});

export type CreateExpenseSchema = z.infer<typeof createExpenseSchema>;
