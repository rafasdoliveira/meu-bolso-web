import { http } from '@shared/api/http';
import { AxiosInstance } from 'axios';

class DeleteExpenseSubcategoryService {
  constructor(private readonly api: AxiosInstance) {}

  async execute(id: number): Promise<void> {
    await this.api.delete(`/expense-categories/subcategories/${id}`);
  }
}

const deleteExpenseSubcategoryService = new DeleteExpenseSubcategoryService(http);

export { deleteExpenseSubcategoryService, DeleteExpenseSubcategoryService };
