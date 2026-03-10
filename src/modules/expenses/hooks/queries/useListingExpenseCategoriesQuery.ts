import { useQuery } from '@tanstack/react-query';
import { getExpenseCategoriesService } from '../../services/getExpenseCategories/getExpenseCategories.service';
import { GetExpenseCategoriesOutputDto } from '../../services/getExpenseCategories/getExpenseCategories.dto';

const useListingExpenseCategoriesQuery = () => {
  return useQuery<GetExpenseCategoriesOutputDto>({
    queryKey: ['listing-expense-categories'],
    queryFn: () => getExpenseCategoriesService.execute(),
    initialData: [],
  });
};

export { useListingExpenseCategoriesQuery };
