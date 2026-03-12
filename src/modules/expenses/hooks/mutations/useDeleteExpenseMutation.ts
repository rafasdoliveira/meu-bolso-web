import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteExpenseService } from '../../services/deleteExpense/deleteExpense.service';

type DeleteExpenseParams = {
  id: number;
  deleteAll?: boolean;
};

export function useDeleteExpenseMutation() {
  const queryClient = useQueryClient();

  return useMutation<void, Error, DeleteExpenseParams>({
    mutationFn: ({ id, deleteAll }) =>
      deleteExpenseService.execute(id, deleteAll),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['listing-expenses'] });
      queryClient.invalidateQueries({ queryKey: ['expenses-summary'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard-chart'] });
    },
  });
}
