import { SubcategoryDto } from '../getExpenseCategories/getExpenseCategories.dto';

export type UpdateExpenseSubcategoryInputDto = {
  id: number;
  name: string;
};

export type UpdateExpenseSubcategoryOutputDto = SubcategoryDto;
