import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createExpenseCategoryService } from '../../services/postExpenseCategory/postExpenseCategory.service';
import {
  CreateExpenseCategoryInputDto,
  CreateExpenseCategoryOutputDto,
} from '../../services/postExpenseCategory/postExpenseCategory.dto';

export function useCreateExpenseCategoryMutation() {
  const queryClient = useQueryClient();

  return useMutation<
    CreateExpenseCategoryOutputDto,
    Error,
    CreateExpenseCategoryInputDto
  >({
    mutationFn: (payload) => createExpenseCategoryService.execute(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['listing-expense-categories'] });
    },
  });
}
