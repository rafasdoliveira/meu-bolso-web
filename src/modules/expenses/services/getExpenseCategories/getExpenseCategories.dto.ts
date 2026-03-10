export type SubcategoryDto = {
  id: number;
  name: string;
};

export type CategoryDto = {
  id: number;
  name: string;
  subcategories: SubcategoryDto[];
};

export type GetExpenseCategoriesOutputDto = CategoryDto[];
