import { http } from '@shared/api/http';
import { ApiResponse } from '@shared/types/apiResponse';
import { AxiosInstance } from 'axios';
import {
  UpdateIncomeStatusInputDto,
  UpdateIncomeStatusOutputDto,
} from './patchIncomesStatus.dto';

class UpdateIncomeStatusService {
  constructor(private readonly api: AxiosInstance) {}

  async execute({
    id,
    status_id,
  }: UpdateIncomeStatusInputDto): Promise<UpdateIncomeStatusOutputDto> {
    const response = await this.api.patch<ApiResponse<UpdateIncomeStatusOutputDto>>(
      `/incomes/${id}/status`,
      { status_id },
    );
    return response.data.data;
  }
}

const updateIncomeStatusService = new UpdateIncomeStatusService(http);

export { updateIncomeStatusService, UpdateIncomeStatusService };
