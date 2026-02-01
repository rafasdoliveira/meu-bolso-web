import { http } from '@shared/api/http';
import { AxiosInstance } from 'axios';
import { GetSourcesOutputDto } from './getSources.dto';

class GetSourcesService {
  constructor(private readonly api: AxiosInstance) {}

  async execute(): Promise<GetSourcesOutputDto> {
    const response = await this.api.get<GetSourcesOutputDto>(`/sources`);
    return response.data;
  }
}

const getSourcesService = new GetSourcesService(http);

export { getSourcesService, GetSourcesService };
