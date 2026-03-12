import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteExpenseSubcategoryService } from '../../services/deleteExpenseSubcategory/deleteExpenseSubcategory.service';

export function useDeleteExpenseSubcategoryMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteExpenseSubcategoryService.execute(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['listing-expense-categories'] });
    },
  });
}
