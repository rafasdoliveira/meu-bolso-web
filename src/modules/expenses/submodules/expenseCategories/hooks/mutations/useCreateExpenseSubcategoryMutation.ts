import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createExpenseSubcategoryService } from '../../services/postExpenseSubcategory/postExpenseSubcategory.service';
import {
  CreateExpenseSubcategoryInputDto,
  CreateExpenseSubcategoryOutputDto,
} from '../../services/postExpenseSubcategory/postExpenseSubcategory.dto';

export function useCreateExpenseSubcategoryMutation() {
  const queryClient = useQueryClient();

  return useMutation<
    CreateExpenseSubcategoryOutputDto,
    Error,
    CreateExpenseSubcategoryInputDto
  >({
    mutationFn: (payload) => createExpenseSubcategoryService.execute(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['listing-expense-categories'] });
    },
  });
}
