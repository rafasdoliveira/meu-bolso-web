import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateExpenseCategoryService } from '../../services/putExpenseCategory/putExpenseCategory.service';
import { UpdateExpenseCategoryInputDto } from '../../services/putExpenseCategory/putExpenseCategory.dto';

export function useUpdateExpenseCategoryMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: UpdateExpenseCategoryInputDto) =>
      updateExpenseCategoryService.execute(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['listing-expense-categories'] });
    },
  });
}
