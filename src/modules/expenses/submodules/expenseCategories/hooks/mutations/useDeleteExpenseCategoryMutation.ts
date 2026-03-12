import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteExpenseCategoryService } from '../../services/deleteExpenseCategory/deleteExpenseCategory.service';

export function useDeleteExpenseCategoryMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteExpenseCategoryService.execute(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['listing-expense-categories'] });
    },
  });
}
