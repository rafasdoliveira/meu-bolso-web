import { http } from '@shared/api/http';
import { ApiResponse } from '@shared/types/apiResponse';
import { AxiosInstance } from 'axios';
import { GetExpensesInputDto, GetExpensesOutputDto } from './getExpenses.dto';

class GetExpensesService {
  constructor(private readonly api: AxiosInstance) {}

  async execute(params: GetExpensesInputDto): Promise<GetExpensesOutputDto> {
    const response = await this.api.get<ApiResponse<GetExpensesOutputDto>>(
      '/expenses',
      { params },
    );
    return response.data.data;
  }
}

const getExpensesService = new GetExpensesService(http);

export { getExpensesService, GetExpensesService };
