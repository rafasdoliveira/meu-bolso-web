export type CreateExpenseSubcategoryInputDto = {
  categoryId: number;
  name: string;
};

export type CreateExpenseSubcategoryOutputDto = {
  id: number;
  name: string;
  category_id: number;
};
