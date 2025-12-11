import { CreateIncomeSchema } from './createIncomeSchema';

export const createIncomeDefaultValues: CreateIncomeSchema = {
  date: new Date().toISOString().split('T')[0],
  source_id: 1,
  amount: 0,
  notes: '',
  payment_type: 1,
  status: 1,
};
