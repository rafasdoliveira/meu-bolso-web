import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updatePaymentMethodService } from '../../services/putPaymentMethod/putPaymentMethod.service';
import {
  UpdatePaymentMethodInputDto,
  UpdatePaymentMethodOutputDto,
} from '../../services/putPaymentMethod/putPaymentMethod.dto';

export function useUpdatePaymentMethodMutation() {
  const queryClient = useQueryClient();

  return useMutation<UpdatePaymentMethodOutputDto, Error, UpdatePaymentMethodInputDto>({
    mutationFn: (payload) => updatePaymentMethodService.execute(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['listing-payment-methods'] });
    },
  });
}
