import { http } from '@shared/api/http';
import { ApiResponse } from '@shared/types/apiResponse';
import { AxiosInstance } from 'axios';
import { UpdateIncomeInputDto, UpdateIncomeOutputDto } from './putIncomes.dto';

class UpdateIncomeService {
  constructor(private readonly api: AxiosInstance) {}

  async execute({ id, ...body }: UpdateIncomeInputDto): Promise<UpdateIncomeOutputDto> {
    const response = await this.api.put<ApiResponse<UpdateIncomeOutputDto>>(
      `/incomes/${id}`,
      body,
    );
    return response.data.data;
  }
}

const updateIncomeService = new UpdateIncomeService(http);

export { updateIncomeService, UpdateIncomeService };
