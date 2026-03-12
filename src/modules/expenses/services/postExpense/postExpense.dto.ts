import { Expense } from '@shared/types/expense';

export type CreateExpenseInputDto = {
  user_id: number;
  date: string;
  description: string;
  amount: number;
  installment_current?: number;
  installment_total?: number;
  item?: string;
  notes?: string;
  subcategory_id?: number;
  payment_type_id: number;
  status: 'pending' | 'paid';
  is_recurrent?: boolean;
  recurrence_end_date?: string;
  invoice_date?: string;
};

export type CreateExpenseOutputDto = Expense;
