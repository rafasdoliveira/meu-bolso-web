import { http } from '@shared/api/http';
import { ApiResponse } from '@shared/types/apiResponse';
import { AxiosInstance } from 'axios';
import { GetExpenseCategoriesOutputDto } from './getExpenseCategories.dto';

class GetExpenseCategoriesService {
  constructor(private readonly api: AxiosInstance) {}

  async execute(): Promise<GetExpenseCategoriesOutputDto> {
    const response = await this.api.get<ApiResponse<GetExpenseCategoriesOutputDto>>('/expense-categories');
    return response.data.data;
  }
}

const getExpenseCategoriesService = new GetExpenseCategoriesService(http);

export { getExpenseCategoriesService, GetExpenseCategoriesService };
