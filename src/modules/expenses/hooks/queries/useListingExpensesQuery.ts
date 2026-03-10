import { useQuery } from '@tanstack/react-query';
import { getExpensesService } from '../../services/getExpenses/getExpenses.service';
import { GetExpensesInputDto, GetExpensesOutputDto } from '../../services/getExpenses/getExpenses.dto';

const useListingExpensesQuery = (params: GetExpensesInputDto) => {
  return useQuery<GetExpensesOutputDto>({
    queryKey: ['listing-expenses', params],
    queryFn: () => getExpensesService.execute(params),
  });
};

export { useListingExpensesQuery };
