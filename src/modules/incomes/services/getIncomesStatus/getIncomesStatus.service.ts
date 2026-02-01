import { http } from '@shared/api/http';
import { AxiosInstance } from 'axios';
import { GetIncomesStatusOutputDto } from './getIncomesStatus.dto';

class GetIncomesStatusService {
  constructor(private readonly api: AxiosInstance) {}

  async execute(): Promise<GetIncomesStatusOutputDto> {
    const response = await this.api.get<GetIncomesStatusOutputDto>(`/income-status`);
    return response.data;
  }
}

const getIncomesStatusService = new GetIncomesStatusService(http);

export { getIncomesStatusService, GetIncomesStatusService };
