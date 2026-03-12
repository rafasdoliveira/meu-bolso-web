import { CategoryDto } from '../getExpenseCategories/getExpenseCategories.dto';

export type CreateExpenseCategoryInputDto = {
  name: string;
};

export type CreateExpenseCategoryOutputDto = CategoryDto;
