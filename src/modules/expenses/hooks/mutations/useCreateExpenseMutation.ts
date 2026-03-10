import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createExpenseService } from '../../services/postExpense/postExpense.service';
import { CreateExpenseInputDto, CreateExpenseOutputDto } from '../../services/postExpense/postExpense.dto';

export function useCreateExpenseMutation() {
  const queryClient = useQueryClient();

  return useMutation<CreateExpenseOutputDto, Error, CreateExpenseInputDto>({
    mutationFn: (payload) => createExpenseService.execute(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['listing-expenses'] });
    },
  });
}
