import { http } from '@shared/api/http';
import { AxiosInstance } from 'axios';
import { GetPaymentTypesOutputDto } from './getPaymentTypes.dto';

class GetPaymentTypesService {
  constructor(private readonly api: AxiosInstance) {}

  async execute(): Promise<GetPaymentTypesOutputDto> {
    const response = await this.api.get<GetPaymentTypesOutputDto>(`/payment-types`);
    return response.data;
  }
}

const getPaymentTypesService = new GetPaymentTypesService(http);

export { getPaymentTypesService, GetPaymentTypesService };
