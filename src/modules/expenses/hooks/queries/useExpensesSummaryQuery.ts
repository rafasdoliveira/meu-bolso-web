import { useQuery } from '@tanstack/react-query';
import { getExpensesService } from '../../services/getExpenses/getExpenses.service';
import { GetExpensesOutputDto } from '../../services/getExpenses/getExpenses.dto';

type Params = {
  month?: number;
  year?: number;
  invoice_month?: number;
  invoice_year?: number;
};

const useExpensesSummaryQuery = (params: Params) => {
  return useQuery<GetExpensesOutputDto>({
    queryKey: ['expenses-summary', params],
    queryFn: () =>
      getExpensesService.execute({ page: 1, size: 9999, ...params }),
  });
};

export { useExpensesSummaryQuery };
