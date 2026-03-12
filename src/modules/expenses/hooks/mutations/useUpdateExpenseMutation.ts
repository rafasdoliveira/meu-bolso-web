import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateExpenseService } from '../../services/putExpense/putExpense.service';
import {
  UpdateExpenseInputDto,
  UpdateExpenseOutputDto,
} from '../../services/putExpense/putExpense.dto';

export function useUpdateExpenseMutation() {
  const queryClient = useQueryClient();

  return useMutation<UpdateExpenseOutputDto, Error, UpdateExpenseInputDto>({
    mutationFn: (payload) => updateExpenseService.execute(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['listing-expenses'] });
      queryClient.invalidateQueries({ queryKey: ['expenses-summary'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard-chart'] });
    },
  });
}
