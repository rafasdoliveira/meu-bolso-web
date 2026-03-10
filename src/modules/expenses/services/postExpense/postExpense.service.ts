import { http } from '@shared/api/http';
import { ApiResponse } from '@shared/types/apiResponse';
import { AxiosInstance } from 'axios';
import { CreateExpenseInputDto, CreateExpenseOutputDto } from './postExpense.dto';

class CreateExpenseService {
  constructor(private readonly api: AxiosInstance) {}

  async execute(params: CreateExpenseInputDto): Promise<CreateExpenseOutputDto> {
    const response = await this.api.post<ApiResponse<CreateExpenseOutputDto>>('/expenses', params);
    return response.data.data;
  }
}

const createExpenseService = new CreateExpenseService(http);

export { createExpenseService, CreateExpenseService };
