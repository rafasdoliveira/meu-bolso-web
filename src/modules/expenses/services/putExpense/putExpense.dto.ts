import { Expense } from '@shared/types/expense';

export type UpdateExpenseInputDto = {
  id: number;
  update_all?: boolean;
  date?: string;
  description?: string;
  amount?: number;
  installment_current?: number;
  installment_total?: number;
  item?: string;
  notes?: string;
  subcategory_id?: number;
  payment_type_id?: number;
  status?: 'pending' | 'paid';
  invoice_date?: string;
};

export type UpdateExpenseOutputDto = Expense;
