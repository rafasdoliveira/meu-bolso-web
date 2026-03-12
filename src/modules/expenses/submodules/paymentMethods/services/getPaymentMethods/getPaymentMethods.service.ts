import { http } from '@shared/api/http';
import { ApiResponse } from '@shared/types/apiResponse';
import { AxiosInstance } from 'axios';
import { GetPaymentMethodsOutputDto } from './getPaymentMethods.dto';

class GetPaymentMethodsService {
  constructor(private readonly api: AxiosInstance) {}

  async execute(user_id: number): Promise<GetPaymentMethodsOutputDto> {
    const response = await this.api.get<ApiResponse<GetPaymentMethodsOutputDto>>(
      '/payment-methods',
      { params: { user_id } },
    );
    return response.data.data;
  }
}

const getPaymentMethodsService = new GetPaymentMethodsService(http);

export { getPaymentMethodsService, GetPaymentMethodsService };
