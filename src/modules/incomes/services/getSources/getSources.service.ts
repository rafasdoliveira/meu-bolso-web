import { http } from '@shared/api/http';
import { AxiosInstance } from 'axios';
import { GetSourcesOutputDto } from './getSources.dto';
import { ApiResponse } from '@shared/types/apiResponse';

class GetSourcesService {
  constructor(private readonly api: AxiosInstance) {}

  async execute(): Promise<GetSourcesOutputDto> {
    const response = await this.api.get<ApiResponse<GetSourcesOutputDto>>(`/sources`);
    return response.data.data;
  }
}

const getSourcesService = new GetSourcesService(http);

export { getSourcesService, GetSourcesService };
