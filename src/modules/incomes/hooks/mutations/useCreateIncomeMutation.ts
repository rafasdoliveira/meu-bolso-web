import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createIncomesService } from '../../services/postIncomes/postIncomes.service';
import { CreateIncomeInputDto, CreateIncomeOutputDto } from '../../services/postIncomes/postIncomes.dto';

export function useCreateIncomeMutation() {
  const queryClient = useQueryClient();

  return useMutation<CreateIncomeOutputDto, Error, CreateIncomeInputDto>({
    mutationFn: (payload) => createIncomesService.execute(payload),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['incomes'],
      });
    },
  });
}
