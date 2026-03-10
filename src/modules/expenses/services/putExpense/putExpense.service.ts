import { http } from '@shared/api/http';
import { ApiResponse } from '@shared/types/apiResponse';
import { AxiosInstance } from 'axios';
import { UpdateExpenseInputDto, UpdateExpenseOutputDto } from './putExpense.dto';

class UpdateExpenseService {
  constructor(private readonly api: AxiosInstance) {}

  async execute({ id, ...body }: UpdateExpenseInputDto): Promise<UpdateExpenseOutputDto> {
    const response = await this.api.put<ApiResponse<UpdateExpenseOutputDto>>(`/expenses/${id}`, body);
    return response.data.data;
  }
}

const updateExpenseService = new UpdateExpenseService(http);

export { updateExpenseService, UpdateExpenseService };
