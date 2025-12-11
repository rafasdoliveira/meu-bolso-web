import { Income } from '@shared/types/income';

export type GetIncomesIntputDto = {
  page: number;
  size: number;
};

export type GetIncomesOutputDto = {
  page: number;
  size: number;
  total: number;
  data: Income[];
};
