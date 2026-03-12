import { http } from '@shared/api/http';
import { ApiResponse } from '@shared/types/apiResponse';
import { AxiosInstance } from 'axios';
import { PayInvoiceInputDto, PayInvoiceOutputDto } from './patchInvoicePayment.dto';

class PatchInvoicePaymentService {
  constructor(private readonly api: AxiosInstance) {}

  async execute({ id, ...body }: PayInvoiceInputDto): Promise<PayInvoiceOutputDto> {
    const response = await this.api.patch<ApiResponse<PayInvoiceOutputDto>>(
      `/invoices/${id}/payment`,
      body,
    );
    return response.data.data;
  }
}

const patchInvoicePaymentService = new PatchInvoicePaymentService(http);

export { patchInvoicePaymentService, PatchInvoicePaymentService };
