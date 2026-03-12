import { http } from '@shared/api/http';
import { AxiosInstance } from 'axios';

class DeleteIncomeService {
  constructor(private readonly api: AxiosInstance) {}

  async execute(id: number): Promise<void> {
    await this.api.delete(`/incomes/${id}`);
  }
}

const deleteIncomeService = new DeleteIncomeService(http);

export { deleteIncomeService, DeleteIncomeService };
