import { http } from '@shared/api/http';
import { AxiosInstance } from 'axios';

class DeleteExpenseCategoryService {
  constructor(private readonly api: AxiosInstance) {}

  async execute(id: number): Promise<void> {
    await this.api.delete(`/expense-categories/${id}`);
  }
}

const deleteExpenseCategoryService = new DeleteExpenseCategoryService(http);

export { deleteExpenseCategoryService, DeleteExpenseCategoryService };
