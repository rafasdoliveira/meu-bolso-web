import { http } from '@shared/api/http';
import { ApiResponse } from '@shared/types/apiResponse';
import { AxiosInstance } from 'axios';
import { GetInvoicesInputDto, GetInvoicesOutputDto } from './getInvoices.dto';

class GetInvoicesService {
  constructor(private readonly api: AxiosInstance) {}

  async execute(params: GetInvoicesInputDto): Promise<GetInvoicesOutputDto> {
    const response = await this.api.get<ApiResponse<GetInvoicesOutputDto>>(
      '/invoices',
      { params },
    );
    return response.data.data;
  }
}

const getInvoicesService = new GetInvoicesService(http);

export { getInvoicesService, GetInvoicesService };
