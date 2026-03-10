import { Expense } from '@shared/types/expense';

export type GetExpensesInputDto = {
  page: number;
  size: number;
  year?: number;
  month?: number;
};

export type GetExpensesOutputDto = {
  page: number;
  size: number;
  total: number;
  data: Expense[];
};
