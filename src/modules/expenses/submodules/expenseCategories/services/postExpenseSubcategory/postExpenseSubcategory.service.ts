import { http } from '@shared/api/http';
import { ApiResponse } from '@shared/types/apiResponse';
import { AxiosInstance } from 'axios';
import {
  CreateExpenseSubcategoryInputDto,
  CreateExpenseSubcategoryOutputDto,
} from './postExpenseSubcategory.dto';

class CreateExpenseSubcategoryService {
  constructor(private readonly api: AxiosInstance) {}

  async execute({
    categoryId,
    name,
  }: CreateExpenseSubcategoryInputDto): Promise<CreateExpenseSubcategoryOutputDto> {
    const response = await this.api.post<
      ApiResponse<CreateExpenseSubcategoryOutputDto>
    >(`/expense-categories/${categoryId}/subcategories`, { name });
    return response.data.data;
  }
}

const createExpenseSubcategoryService = new CreateExpenseSubcategoryService(http);

export { createExpenseSubcategoryService, CreateExpenseSubcategoryService };
