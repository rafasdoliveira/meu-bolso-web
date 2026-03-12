import { CategoryDto } from '../getExpenseCategories/getExpenseCategories.dto';

export type UpdateExpenseCategoryInputDto = {
  id: number;
  name: string;
};

export type UpdateExpenseCategoryOutputDto = CategoryDto;
