import { http } from '@shared/api/http';
import { ApiResponse } from '@shared/types/apiResponse';
import { AxiosInstance } from 'axios';
import { UpdateExpenseCategoryInputDto, UpdateExpenseCategoryOutputDto } from './putExpenseCategory.dto';

class UpdateExpenseCategoryService {
  constructor(private readonly api: AxiosInstance) {}

  async execute({ id, name }: UpdateExpenseCategoryInputDto): Promise<UpdateExpenseCategoryOutputDto> {
    const response = await this.api.put<ApiResponse<UpdateExpenseCategoryOutputDto>>(
      `/expense-categories/${id}`,
      { name },
    );
    return response.data.data;
  }
}

const updateExpenseCategoryService = new UpdateExpenseCategoryService(http);

export { updateExpenseCategoryService, UpdateExpenseCategoryService };
