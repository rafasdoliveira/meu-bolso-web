import { http } from '@shared/api/http';
import { AxiosInstance } from 'axios';

class DeletePaymentMethodService {
  constructor(private readonly api: AxiosInstance) {}

  async execute(id: number): Promise<void> {
    await this.api.delete(`/payment-methods/${id}`);
  }
}

const deletePaymentMethodService = new DeletePaymentMethodService(http);

export { deletePaymentMethodService, DeletePaymentMethodService };
