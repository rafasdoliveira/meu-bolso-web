import { http } from '@shared/api/http';
import { ApiResponse } from '@shared/types/apiResponse';
import { AxiosInstance } from 'axios';
import { CreatePaymentMethodInputDto, CreatePaymentMethodOutputDto } from './postPaymentMethod.dto';

class CreatePaymentMethodService {
  constructor(private readonly api: AxiosInstance) {}

  async execute(params: CreatePaymentMethodInputDto): Promise<CreatePaymentMethodOutputDto> {
    const response = await this.api.post<ApiResponse<CreatePaymentMethodOutputDto>>(
      '/payment-methods',
      params,
    );
    return response.data.data;
  }
}

const createPaymentMethodService = new CreatePaymentMethodService(http);

export { createPaymentMethodService, CreatePaymentMethodService };
