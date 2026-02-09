import { http } from '@shared/api/http';
import { AxiosInstance } from 'axios';
import { GetIncomesStatusOutputDto } from './getIncomesStatus.dto';
import { ApiResponse } from '@shared/types/apiResponse';

class GetIncomesStatusService {
  constructor(private readonly api: AxiosInstance) {}

  async execute(): Promise<GetIncomesStatusOutputDto> {
    const response = await this.api.get<ApiResponse<GetIncomesStatusOutputDto>>(`/income-status`);
    return response.data.data;
  }
}

const getIncomesStatusService = new GetIncomesStatusService(http);

export { getIncomesStatusService, GetIncomesStatusService };
