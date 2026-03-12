import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateIncomeStatusService } from '../../services/patchIncomesStatus/patchIncomesStatus.service';
import {
  UpdateIncomeStatusInputDto,
  UpdateIncomeStatusOutputDto,
} from '../../services/patchIncomesStatus/patchIncomesStatus.dto';

export function useUpdateIncomeStatusMutation() {
  const queryClient = useQueryClient();

  return useMutation<UpdateIncomeStatusOutputDto, Error, UpdateIncomeStatusInputDto>({
    mutationFn: (payload) => updateIncomeStatusService.execute(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['listing-income'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard-incomes-summary'] });
    },
  });
}
