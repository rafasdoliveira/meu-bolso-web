import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deletePaymentMethodService } from '../../services/deletePaymentMethod/deletePaymentMethod.service';

export function useDeletePaymentMethodMutation() {
  const queryClient = useQueryClient();

  return useMutation<void, Error, number>({
    mutationFn: (id) => deletePaymentMethodService.execute(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['listing-payment-methods'] });
    },
  });
}
