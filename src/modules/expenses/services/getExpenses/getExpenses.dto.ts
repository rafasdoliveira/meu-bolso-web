import { Expense } from '@shared/types/expense';

export type GetExpensesInputDto = {
  page: number;
  size: number;
  year?: number;
  month?: number;
  search?: string;
  payment_method_id?: number;
  invoice_month?: number;
  invoice_year?: number;
};

export type GetExpensesOutputDto = {
  page: number;
  size: number;
  total: number;
  totalPages: number;
  data: Expense[];
};
