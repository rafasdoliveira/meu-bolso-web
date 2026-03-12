import { http } from '@shared/api/http';
import { ApiResponse } from '@shared/types/apiResponse';
import { AxiosInstance } from 'axios';
import { UpdatePaymentMethodInputDto, UpdatePaymentMethodOutputDto } from './putPaymentMethod.dto';

class UpdatePaymentMethodService {
  constructor(private readonly api: AxiosInstance) {}

  async execute({ id, ...body }: UpdatePaymentMethodInputDto): Promise<UpdatePaymentMethodOutputDto> {
    const response = await this.api.put<ApiResponse<UpdatePaymentMethodOutputDto>>(
      `/payment-methods/${id}`,
      body,
    );
    return response.data.data;
  }
}

const updatePaymentMethodService = new UpdatePaymentMethodService(http);

export { updatePaymentMethodService, UpdatePaymentMethodService };
