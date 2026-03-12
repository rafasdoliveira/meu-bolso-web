import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateIncomeService } from '../../services/putIncomes/putIncomes.service';
import { UpdateIncomeInputDto, UpdateIncomeOutputDto } from '../../services/putIncomes/putIncomes.dto';

export function useUpdateIncomeMutation() {
  const queryClient = useQueryClient();

  return useMutation<UpdateIncomeOutputDto, Error, UpdateIncomeInputDto>({
    mutationFn: (payload) => updateIncomeService.execute(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['listing-income'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard-incomes-summary'] });
    },
  });
}
