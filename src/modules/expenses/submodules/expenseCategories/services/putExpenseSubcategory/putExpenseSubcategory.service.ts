import { http } from '@shared/api/http';
import { ApiResponse } from '@shared/types/apiResponse';
import { AxiosInstance } from 'axios';
import { UpdateExpenseSubcategoryInputDto, UpdateExpenseSubcategoryOutputDto } from './putExpenseSubcategory.dto';

class UpdateExpenseSubcategoryService {
  constructor(private readonly api: AxiosInstance) {}

  async execute({ id, name }: UpdateExpenseSubcategoryInputDto): Promise<UpdateExpenseSubcategoryOutputDto> {
    const response = await this.api.put<ApiResponse<UpdateExpenseSubcategoryOutputDto>>(
      `/expense-categories/subcategories/${id}`,
      { name },
    );
    return response.data.data;
  }
}

const updateExpenseSubcategoryService = new UpdateExpenseSubcategoryService(http);

export { updateExpenseSubcategoryService, UpdateExpenseSubcategoryService };
