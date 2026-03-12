import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateExpenseSubcategoryService } from '../../services/putExpenseSubcategory/putExpenseSubcategory.service';
import { UpdateExpenseSubcategoryInputDto } from '../../services/putExpenseSubcategory/putExpenseSubcategory.dto';

export function useUpdateExpenseSubcategoryMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: UpdateExpenseSubcategoryInputDto) =>
      updateExpenseSubcategoryService.execute(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['listing-expense-categories'] });
    },
  });
}
