import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateExpenseStatusService } from '../../services/patchExpenseStatus/patchExpenseStatus.service';
import {
  UpdateExpenseStatusInputDto,
  UpdateExpenseStatusOutputDto,
} from '../../services/patchExpenseStatus/patchExpenseStatus.dto';

export function useUpdateExpenseStatusMutation() {
  const queryClient = useQueryClient();

  return useMutation<
    UpdateExpenseStatusOutputDto,
    Error,
    UpdateExpenseStatusInputDto
  >({
    mutationFn: (payload) => updateExpenseStatusService.execute(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['listing-expenses'] });
    },
  });
}
