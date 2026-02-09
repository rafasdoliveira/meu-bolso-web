import { http } from '@shared/api/http';
import { AxiosInstance } from 'axios';
import { ApiResponse } from '@shared/types/apiResponse';
import { CreateIncomeInputDto, CreateIncomeOutputDto } from './postIncomes.dto';

class CreateIncomesService {
  constructor(private readonly api: AxiosInstance) {}

  async execute(
    params: CreateIncomeInputDto
  ): Promise<CreateIncomeOutputDto> {
    const response = await this.api.post<
      ApiResponse<CreateIncomeOutputDto>
    >('/incomes', params);

    return response.data.data;
  }
}

const createIncomesService = new CreateIncomesService(http);

export { createIncomesService, CreateIncomesService };
