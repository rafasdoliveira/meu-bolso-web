import { CreateIncomeSchema } from './createIncomeSchema';

export const createIncomeDefaultValues: CreateIncomeSchema = {
  date: new Date().toISOString().split('T')[0],
  source_id: '',
  amount: 0,
  notes: '',
  payment_type_id: '',
  status_id: '',
};
