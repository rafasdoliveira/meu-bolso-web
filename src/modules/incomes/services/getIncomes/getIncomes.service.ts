import { http } from '@shared/api/http';
import { AxiosInstance } from 'axios';
import { GetIncomesIntputDto, GetIncomesOutputDto } from './getIncomes.dto';
import { ApiResponse } from '@shared/types/apiResponse';

class GetIncomesService {
  constructor(private readonly api: AxiosInstance) {}

  async execute(params: GetIncomesIntputDto): Promise<GetIncomesOutputDto> {
    const response = await this.api.get<ApiResponse<GetIncomesOutputDto>>(`/incomes`, {
      params,
    });
    return response.data.data;
  }
}

const getIncomesService = new GetIncomesService(http);

export { getIncomesService, GetIncomesService };
