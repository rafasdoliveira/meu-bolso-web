import { http } from '@shared/api/http';
import { ApiResponse } from '@shared/types/apiResponse';
import { AxiosInstance } from 'axios';
import {
  CreateExpenseCategoryInputDto,
  CreateExpenseCategoryOutputDto,
} from './postExpenseCategory.dto';

class CreateExpenseCategoryService {
  constructor(private readonly api: AxiosInstance) {}

  async execute(
    params: CreateExpenseCategoryInputDto,
  ): Promise<CreateExpenseCategoryOutputDto> {
    const response = await this.api.post<
      ApiResponse<CreateExpenseCategoryOutputDto>
    >('/expense-categories', params);
    return response.data.data;
  }
}

const createExpenseCategoryService = new CreateExpenseCategoryService(http);

export { createExpenseCategoryService, CreateExpenseCategoryService };
