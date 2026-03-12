import { z } from 'zod';

export const createExpenseSchema = z.object({
  date: z.string().refine((val) => !Number.isNaN(Date.parse(val)), {
    message:
      'O campo Data é obrigatório e deve ser uma data válida (YYYY-MM-DD)',
  }),
  description: z
    .string({ message: 'O campo Gasto é obrigatório' })
    .min(1, 'O campo Gasto é obrigatório'),
  amount: z.coerce
    .number()
    .refine((v) => !Number.isNaN(v), { message: 'Valor é obrigatório' })
    .positive('O valor deve ser maior que zero'),
  payment_type_id: z.string({
    message: 'O campo Tipo de Pagamento é obrigatório',
  }),
  status: z.enum(['pending', 'paid'], {
    message: 'Status deve ser "pending" ou "paid"',
  }),
  installment_current: z.preprocess(
    (val) => (val === '' || val === undefined || val === null ? undefined : Number(val)),
    z.number().int().positive().optional(),
  ),
  installment_total: z.preprocess(
    (val) => (val === '' || val === undefined || val === null ? undefined : Number(val)),
    z.number().int().positive().optional(),
  ),
  item: z.string().optional(),
  notes: z.string().optional(),
  subcategory_id: z.string().optional(),
  is_recurrent: z.boolean().optional(),
  recurrence_end_date: z.string().optional(),
}).superRefine((data, ctx) => {
  // Installment rules only apply when NOT recurrent
  if (!data.is_recurrent) {
    const hasCurrent = data.installment_current !== undefined;
    const hasTotal = data.installment_total !== undefined;

    if (hasCurrent && !hasTotal) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['installment_total'],
        message: 'Informe o total de parcelas',
      });
    }

    if (!hasCurrent && hasTotal) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['installment_current'],
        message: 'Informe a parcela atual',
      });
    }

    if (
      hasCurrent &&
      hasTotal &&
      data.installment_current! > data.installment_total!
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['installment_current'],
        message: 'A parcela atual não pode ser maior que o total',
      });
    }
  }
});

export type CreateExpenseSchema = z.infer<typeof createExpenseSchema>;
