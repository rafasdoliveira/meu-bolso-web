import { CreateExpenseSchema } from './createExpenseSchema';

export const createExpenseDefaultValues: CreateExpenseSchema = {
  date: new Date().toISOString().split('T')[0],
  description: '',
  amount: 0,
  payment_type_id: '',
  status: 'pending',
  item: '',
  notes: '',
  subcategory_id: '',
  is_recurrent: false,
  recurrence_end_date: '',
};
