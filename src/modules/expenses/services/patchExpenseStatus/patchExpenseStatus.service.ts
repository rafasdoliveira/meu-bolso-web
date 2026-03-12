import { http } from '@shared/api/http';
import { ApiResponse } from '@shared/types/apiResponse';
import { AxiosInstance } from 'axios';
import {
  UpdateExpenseStatusInputDto,
  UpdateExpenseStatusOutputDto,
} from './patchExpenseStatus.dto';

class UpdateExpenseStatusService {
  constructor(private readonly api: AxiosInstance) {}

  async execute({
    id,
    status,
  }: UpdateExpenseStatusInputDto): Promise<UpdateExpenseStatusOutputDto> {
    const response = await this.api.patch<
      ApiResponse<UpdateExpenseStatusOutputDto>
    >(`/expenses/${id}/status`, { status });
    return response.data.data;
  }
}

const updateExpenseStatusService = new UpdateExpenseStatusService(http);

export { updateExpenseStatusService, UpdateExpenseStatusService };
