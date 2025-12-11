import { http } from '@shared/api/http';
import { AxiosInstance } from 'axios';
import { GetIncomesIntputDto, GetIncomesOutputDto } from './getIncomes.dto';

class GetIncomesService {
  constructor(private readonly api: AxiosInstance) {}

  async execute(params: GetIncomesIntputDto): Promise<GetIncomesOutputDto> {
    const response = await this.api.get<GetIncomesOutputDto>(`/incomes`, {
      params,
    });
    return response.data;
  }
}

const getIncomesService = new GetIncomesService(http);

export { getIncomesService, GetIncomesService };
