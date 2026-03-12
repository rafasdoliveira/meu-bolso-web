import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createPaymentMethodService } from '../../services/postPaymentMethod/postPaymentMethod.service';
import {
  CreatePaymentMethodInputDto,
  CreatePaymentMethodOutputDto,
} from '../../services/postPaymentMethod/postPaymentMethod.dto';

export function useCreatePaymentMethodMutation() {
  const queryClient = useQueryClient();

  return useMutation<CreatePaymentMethodOutputDto, Error, CreatePaymentMethodInputDto>({
    mutationFn: (payload) => createPaymentMethodService.execute(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['listing-payment-methods'] });
    },
  });
}
