import { useQuery } from '@tanstack/react-query';
import { getIncomesStatusService } from '../services/getIncomesStatus/getIncomesStatus.service';

const useListingIncomesStatusQuery = () => {
  return useQuery({
    queryKey: ['listing-income-status'],
    queryFn: async () => getIncomesStatusService.execute(),
    initialData: []
  });
};

export { useListingIncomesStatusQuery };
