import { Income } from '@shared/types/income';

export type UpdateIncomeInputDto = {
  id: number;
  date?: string;
  source_id?: number;
  amount?: number;
  notes?: string;
  payment_type_id?: number;
  status_id?: number;
};

export type UpdateIncomeOutputDto = Income;
