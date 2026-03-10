import { http } from '@shared/api/http';
import { AxiosInstance } from 'axios';

class DeleteExpenseService {
  constructor(private readonly api: AxiosInstance) {}

  async execute(id: number, deleteAll = false): Promise<void> {
    await this.api.delete(`/expenses/${id}`, {
      params: { delete_all: deleteAll },
    });
  }
}

const deleteExpenseService = new DeleteExpenseService(http);

export { deleteExpenseService, DeleteExpenseService };
