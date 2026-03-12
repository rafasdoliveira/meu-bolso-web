import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteIncomeService } from '../../services/deleteIncomes/deleteIncomes.service';

export function useDeleteIncomeMutation() {
  const queryClient = useQueryClient();

  return useMutation<void, Error, number>({
    mutationFn: (id) => deleteIncomeService.execute(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['listing-income'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard-incomes-summary'] });
    },
  });
}
